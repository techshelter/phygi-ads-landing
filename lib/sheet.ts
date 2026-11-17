import { internationalPhone, type Lead } from './lead.ts'

/** Column order of the leads Google Sheet. Row 1 of the sheet should hold these headers. */
export const SHEET_HEADERS = [
  'Date', 'Profile', 'First name', 'Last name', 'Company', 'Phone', 'Email',
  'Target communes', 'Budget', 'Shop type', 'Commune', 'Customers per day', 'Consent',
] as const

/** Sheets runs a cell starting with one of these as a formula; a leading quote keeps it as text. */
const FORMULA_START = /^[=+\-@]/

const asText = (value: string) => (FORMULA_START.test(value) ? `'${value}` : value)

export function leadToRow(lead: Lead, date: Date): string[] {
  return [
    date.toISOString(),
    lead.profile,
    lead.firstName.trim(),
    lead.lastName.trim(),
    lead.company.trim(),
    internationalPhone(lead),
    lead.email.trim(),
    lead.communes.join(', '),
    lead.budget,
    lead.shopType,
    lead.commune,
    lead.volume,
    lead.consent ? 'yes' : 'no',
  ].map(asText)
}

export function shouldRecordLeads(env: Record<string, string | undefined>): boolean {
  return env.VERCEL_ENV === 'production'
}
