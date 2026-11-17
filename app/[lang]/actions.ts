'use server'

import { parseLead, validateLead, type Lead, type LeadError } from '@/lib/lead'
import { leadToRow, shouldRecordLeads } from '@/lib/sheet'

export type SubmitResult = { ok: true } | { ok: false; error: LeadError | 'network' }

const SHEET_TIMEOUT_MS = 10_000

/** Appends the lead to the Google Sheet through its Apps Script webhook (see scripts/leads-sheet.gs). */
async function appendToSheet(lead: Lead): Promise<boolean> {
  const url = process.env.LEADS_SHEET_WEBHOOK_URL
  const secret = process.env.LEADS_SHEET_SECRET
  if (!url || !secret) {
    console.error('[lead] LEADS_SHEET_WEBHOOK_URL or LEADS_SHEET_SECRET is not set')
    return false
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, row: leadToRow(lead, new Date()) }),
      signal: AbortSignal.timeout(SHEET_TIMEOUT_MS),
    })
    const result = (await response.json().catch(() => null)) as { ok?: boolean } | null
    if (response.ok && result?.ok) return true
    console.error('[lead] sheet webhook rejected the lead', response.status, result)
  } catch (error) {
    console.error('[lead] sheet webhook unreachable', error)
  }
  return false
}

export async function submitLead(input: unknown): Promise<SubmitResult> {
  const lead = parseLead(input)
  const error = validateLead(lead)
  if (error) return { ok: false, error }

  if (!shouldRecordLeads(process.env)) {
    console.info('[lead] not recorded outside production', JSON.stringify(lead))
    return { ok: true }
  }
  return (await appendToSheet(lead)) ? { ok: true } : { ok: false, error: 'network' }
}
