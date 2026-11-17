export type Profile = 'advertiser' | 'shop'

export interface Lead {
  profile: Profile
  firstName: string
  lastName: string
  company: string
  dialCode: string
  phone: string
  email: string
  communes: string[]
  budget: string
  shopType: string
  commune: string
  volume: string
  consent: boolean
}

export type LeadError = 'identity' | 'shopDetails' | 'phone' | 'email' | 'consent'

export const emptyLead: Lead = {
  profile: 'advertiser',
  firstName: '',
  lastName: '',
  company: '',
  dialCode: '+225',
  phone: '',
  email: '',
  communes: [],
  budget: '',
  shopType: '',
  commune: '',
  volume: '',
  consent: false,
}

const MIN_PHONE_DIGITS = 8
const EMAIL = /^\S+@\S+\.\S+$/

export function validateLead(lead: Lead): LeadError | null {
  if (![lead.firstName, lead.lastName, lead.company].every((v) => v.trim())) return 'identity'
  if (lead.profile === 'shop' && (!lead.shopType || !lead.commune)) return 'shopDetails'
  if (lead.phone.replace(/\D/g, '').length < MIN_PHONE_DIGITS) return 'phone'
  if (lead.email && !EMAIL.test(lead.email)) return 'email'
  if (!lead.consent) return 'consent'
  return null
}

const TEXT_FIELDS = [
  'firstName', 'lastName', 'company', 'dialCode', 'phone', 'email',
  'budget', 'shopType', 'commune', 'volume',
] as const

/** Turns untrusted input (e.g. a Server Action payload) into a well-typed Lead. */
export function parseLead(input: unknown): Lead {
  const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>
  const text = (key: (typeof TEXT_FIELDS)[number]) =>
    typeof raw[key] === 'string' ? (raw[key] as string).slice(0, 200) : emptyLead[key]

  return {
    profile: raw.profile === 'shop' ? 'shop' : 'advertiser',
    ...(Object.fromEntries(TEXT_FIELDS.map((key) => [key, text(key)])) as Pick<Lead, (typeof TEXT_FIELDS)[number]>),
    communes: Array.isArray(raw.communes) ? raw.communes.filter((c): c is string => typeof c === 'string') : [],
    consent: raw.consent === true,
  }
}
