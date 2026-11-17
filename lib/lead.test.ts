import { test } from 'node:test'
import assert from 'node:assert/strict'
import { emptyLead, parseLead, validateLead, type Lead } from './lead.ts'

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

test('requires at least 8 phone digits', () => {
  assert.equal(validateLead({ ...validAdvertiser, phone: '07 00 00' }), 'phone')
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
