import { test } from 'node:test'
import assert from 'node:assert/strict'
import { emptyLead, internationalPhone, parseLead, validateLead, type Lead } from './lead.ts'

const validAdvertiser: Lead = {
  ...emptyLead,
  firstName: 'Awa',
  lastName: 'Koné',
  company: 'Ma marque',
  phone: '07 00 00 00 00',
  consent: true,
}

const validShop: Lead = {
  ...validAdvertiser,
  profile: 'shop',
  shopType: 'Boulangerie',
  commune: 'Cocody',
}

test('accepts a complete advertiser lead', () => {
  assert.equal(validateLead(validAdvertiser), null)
})

test('accepts a complete shop lead', () => {
  assert.equal(validateLead(validShop), null)
})

test('requires identity fields', () => {
  assert.equal(validateLead({ ...validAdvertiser, company: '  ' }), 'identity')
  assert.equal(validateLead({ ...validAdvertiser, firstName: '' }), 'identity')
})

test('requires shop type and commune for shops only', () => {
  assert.equal(validateLead({ ...validShop, commune: '' }), 'shopDetails')
  assert.equal(validateLead({ ...validAdvertiser, commune: '' }), null)
})

test('rejects phone numbers that are not valid for the chosen country', () => {
  assert.equal(validateLead({ ...validAdvertiser, phone: '07 00 00' }), 'phone')
  assert.equal(validateLead({ ...validAdvertiser, phone: '99 00 00 00 00' }), 'phone')
  assert.equal(validateLead({ ...validAdvertiser, phone: 'abc' }), 'phone')
  assert.equal(validateLead({ ...validAdvertiser, dialCode: '+33', phone: '07 00 00 00 00 00' }), 'phone')
})

test('accepts valid numbers for the chosen country', () => {
  assert.equal(validateLead({ ...validAdvertiser, dialCode: '+33', phone: '06 12 34 56 78' }), null)
  assert.equal(validateLead({ ...validAdvertiser, dialCode: '+1', phone: '(415) 555-2671' }), null)
})

test('a number typed with its own +prefix wins over the selected dial code', () => {
  assert.equal(validateLead({ ...validAdvertiser, dialCode: '+225', phone: '+33 6 12 34 56 78' }), null)
})

test('internationalPhone formats valid numbers and keeps invalid ones as typed', () => {
  assert.equal(internationalPhone({ ...validAdvertiser, dialCode: '+225', phone: '+33612345678' }), '+33 6 12 34 56 78')
  assert.equal(internationalPhone({ ...validAdvertiser, phone: '123' }), '+225 123')
})

test('rejects a malformed optional email but accepts an empty one', () => {
  assert.equal(validateLead({ ...validAdvertiser, email: 'nope' }), 'email')
  assert.equal(validateLead({ ...validAdvertiser, email: 'a@b.co' }), null)
})

test('requires consent', () => {
  assert.equal(validateLead({ ...validAdvertiser, consent: false }), 'consent')
})

test('parseLead keeps known fields and drops junk', () => {
  const parsed = parseLead({ ...validShop, communes: ['Cocody', 3], extra: 'x', consent: 'yes' })
  assert.deepEqual(parsed, { ...validShop, communes: ['Cocody'], consent: false })
})

test('parseLead falls back to defaults for non-objects and unknown profiles', () => {
  assert.deepEqual(parseLead(null), emptyLead)
  assert.equal(parseLead({ profile: 'admin' }).profile, 'advertiser')
})
