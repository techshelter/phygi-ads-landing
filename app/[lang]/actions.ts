'use server'

import { parseLead, validateLead, type LeadError } from '@/lib/lead'

export type SubmitResult = { ok: true } | { ok: false; error: LeadError }

export async function submitLead(input: unknown): Promise<SubmitResult> {
  const lead = parseLead(input)
  const error = validateLead(lead)
  if (error) return { ok: false, error }

  // TODO: forward to the real lead destination (CRM, email, sheet…). No backend exists yet.
  console.info('[lead]', JSON.stringify(lead))
  return { ok: true }
}
