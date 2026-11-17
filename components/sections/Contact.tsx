'use client'

import { useState, useTransition } from 'react'
import Backdrop from '@/components/ui/Backdrop'
import Eyebrow from '@/components/ui/Eyebrow'
import { buttonClass } from '@/components/ui/Button'
import { emptyLead, validateLead, type Lead, type LeadError, type Profile } from '@/lib/lead'
import { submitLead } from '@/app/[lang]/actions'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type ContactDict = Dictionary['contact']

const COMMUNES = ['Cocody', 'Yopougon', 'Plateau', 'Marcory', 'Abobo', 'Treichville', 'Bingerville', 'Adjamé', 'Koumassi', 'Port-Bouët']
const VOLUMES = ['< 50', '50 – 150', '150 – 400', '400 +']
const DIAL_CODES = [
  ['+225', 'CI +225'], ['+33', 'FR +33'], ['+221', 'SN +221'], ['+223', 'ML +223'],
  ['+226', 'BF +226'], ['+228', 'TG +228'], ['+229', 'BJ +229'], ['+233', 'GH +233'],
  ['+237', 'CM +237'], ['+44', 'UK +44'], ['+1', 'US/CA +1'],
]
const PROFILES: Profile[] = ['advertiser', 'shop']

const inputClass =
  'h-11 w-full rounded-md border border-wire bg-white px-3 text-[15px] text-ink outline-none focus:border-brand focus:shadow-focus'
const labelClass = 'flex flex-col gap-1.5 text-left text-[13px] font-medium text-navy'

function errorMessage(error: LeadError | 'network', profile: Profile, errors: ContactDict['errors']) {
  if (error === 'identity') return profile === 'shop' ? errors.identityShop : errors.identityAdvertiser
  return errors[error]
}

function Optional({ text }: { text: string }) {
  return <span className="font-normal text-muted"> {text}</span>
}

interface ChipGroupProps {
  label: React.ReactNode
  options: string[]
  isSelected: (value: string) => boolean
  onToggle: (value: string) => void
}

function ChipGroup({ label, options, isSelected, onToggle }: ChipGroupProps) {
  return (
    <fieldset className={`${labelClass} m-0 border-0 p-0`}>
      <legend className="mb-1.5 p-0">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((value) => {
          const on = isSelected(value)
          return (
            <button
              key={value}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(value)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${on ? 'border-brand bg-brand text-white' : 'border-wire bg-white text-navy hover:border-brand-300'}`}
            >
              {value}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function Contact({ contact }: { contact: ContactDict }) {
  const [lead, setLead] = useState<Lead>(emptyLead)
  const [error, setError] = useState<LeadError | 'network' | null>(null)
  const [sent, setSent] = useState(false)
  const [pending, startTransition] = useTransition()

  const copy = contact[lead.profile]
  const { fields, placeholders } = contact

  const update = (patch: Partial<Lead>) => {
    setError(null)
    setLead((current) => ({ ...current, ...patch }))
  }
  const pickOne = (key: 'budget' | 'shopType' | 'commune' | 'volume') => (value: string) =>
    update({ [key]: lead[key] === value ? '' : value })
  const toggleCommune = (value: string) =>
    update({ communes: lead.communes.includes(value) ? lead.communes.filter((c) => c !== value) : [...lead.communes, value] })

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const invalid = validateLead(lead)
    if (invalid) return setError(invalid)
    startTransition(async () => {
      try {
        const result = await submitLead(lead)
        if (result.ok) setSent(true)
        else setError(result.error)
      } catch {
        setError('network')
      }
    })
  }

  return (
    <section id="cta" className="relative overflow-hidden">
      <Backdrop src="/images/cta.webp" alt={contact.imageAlt} overlay={70} />
      <div className="relative mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-18 gap-y-12 px-4 py-24 sm:px-8">
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mb-6 text-[clamp(48px,6vw,84px)] leading-none tracking-[-0.03em] text-balance">
            {copy.title}<span className="text-sky">{copy.titleEm}</span>
          </h2>
          <p className="m-0 max-w-115 text-[19px] text-pretty text-white/90">{copy.description}</p>
        </div>

        <div className="rounded-2xl bg-white p-7 text-ink shadow-xl max-[480px]:p-5">
          {sent ? (
            <div className="flex flex-col items-center gap-3.5 px-2 py-12 text-center" role="status">
              <div className="flex size-14 items-center justify-center rounded-full bg-success/14 text-[28px] font-bold text-green-600">✓</div>
              <div className="font-display text-[28px] font-bold text-navy">{contact.success.title.replace('{name}', lead.firstName)}</div>
              <p className="m-0 max-w-85 text-slate">{contact.success.description}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
              <div role="tablist" className="grid grid-cols-2 gap-1 rounded-[10px] bg-surface p-1">
                {PROFILES.map((profile) => {
                  const on = lead.profile === profile
                  return (
                    <button
                      key={profile}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => update({ profile })}
                      className={`cursor-pointer rounded-[7px] border-0 px-2 py-2.5 text-sm font-semibold ${on ? 'bg-white text-navy shadow-[0_1px_3px_rgba(13,14,71,0.18)]' : 'bg-transparent text-slate'}`}
                    >
                      {contact[profile].tab}
                    </button>
                  )
                })}
              </div>

              <div className="font-display text-[26px] font-bold text-navy">{copy.formTitle}</div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
                <label className={labelClass}>
                  {fields.firstName}
                  <input className={inputClass} autoComplete="given-name" value={lead.firstName} placeholder={placeholders.firstName} onChange={(e) => update({ firstName: e.target.value })} />
                </label>
                <label className={labelClass}>
                  {fields.lastName}
                  <input className={inputClass} autoComplete="family-name" value={lead.lastName} placeholder={placeholders.lastName} onChange={(e) => update({ lastName: e.target.value })} />
                </label>
              </div>

              <label className={labelClass}>
                {copy.companyLabel}
                <input className={inputClass} autoComplete="organization" value={lead.company} placeholder={placeholders.company} onChange={(e) => update({ company: e.target.value })} />
              </label>

              <div className={labelClass}>
                <label htmlFor="lead-phone">{fields.phone}</label>
                <div className="grid grid-cols-[132px_1fr] gap-2">
                  <select aria-label={fields.phone} className={inputClass} value={lead.dialCode} onChange={(e) => update({ dialCode: e.target.value })}>
                    {DIAL_CODES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                  <input id="lead-phone" className={inputClass} type="tel" inputMode="tel" autoComplete="tel-national" value={lead.phone} placeholder={placeholders.phone} onChange={(e) => update({ phone: e.target.value })} />
                </div>
              </div>

              <label className={labelClass}>
                <span>{fields.email}<Optional text={fields.optional} /></span>
                <input className={inputClass} type="email" autoComplete="email" value={lead.email} placeholder={placeholders.email} onChange={(e) => update({ email: e.target.value })} />
              </label>

              {lead.profile === 'advertiser' ? (
                <>
                  <ChipGroup label={<>{fields.communes}<Optional text={fields.optional} /></>} options={COMMUNES} isSelected={(v) => lead.communes.includes(v)} onToggle={toggleCommune} />
                  <ChipGroup label={<>{fields.budget}<Optional text={fields.optional} /></>} options={contact.budgets} isSelected={(v) => lead.budget === v} onToggle={pickOne('budget')} />
                </>
              ) : (
                <>
                  <ChipGroup label={fields.shopType} options={contact.shopTypes} isSelected={(v) => lead.shopType === v} onToggle={pickOne('shopType')} />
                  <ChipGroup label={fields.commune} options={COMMUNES} isSelected={(v) => lead.commune === v} onToggle={pickOne('commune')} />
                  <ChipGroup label={<>{fields.volume}<Optional text={fields.optional} /></>} options={VOLUMES} isSelected={(v) => lead.volume === v} onToggle={pickOne('volume')} />
                </>
              )}

              <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-[1.4] text-slate">
                <input type="checkbox" checked={lead.consent} onChange={(e) => update({ consent: e.target.checked })} className="mt-px size-4.5 flex-none accent-brand" />
                {copy.consent}
              </label>

              {error && <div role="alert" className="text-[13px] font-medium text-red-600">{errorMessage(error, lead.profile, contact.errors)}</div>}

              <button type="submit" disabled={pending} className={`${buttonClass('primary', 'lg')} w-full`}>
                {pending ? contact.sending : contact.submit}
              </button>
              <div className="text-center text-xs text-muted">{contact.noSpam}</div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
