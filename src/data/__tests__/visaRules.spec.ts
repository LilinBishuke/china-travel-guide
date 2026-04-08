import { describe, it, expect } from 'vitest'
import { checkVisaEligibility } from '../visaRules'

describe('checkVisaEligibility', () => {
  // === 30-Day Visa-Free (Unilateral) ===
  describe('unilateral visa-free 30 days', () => {
    const countries = ['JP', 'FR', 'DE', 'AU', 'NZ', 'KR', 'GB', 'CA', 'RU', 'BR', 'AR', 'SA', 'BH']
    countries.forEach(code => {
      it(`${code} + tourism → visa_free_30`, () => {
        const r = checkVisaEligibility(code, 'tourism')
        expect(r.result).toBe('visa_free_30')
        expect(r.policyExpiry).toBe('2026-12-31')
      })

      it(`${code} + business → visa_free_30`, () => {
        const r = checkVisaEligibility(code, 'business')
        expect(r.result).toBe('visa_free_30')
      })
    })
  })

  // === Mutual Visa-Free Agreements ===
  describe('mutual visa-free agreements', () => {
    it('TH + tourism → visa_free_30 (mutual)', () => {
      const r = checkVisaEligibility('TH', 'tourism')
      expect(r.result).toBe('visa_free_30')
    })

    it('SG + tourism → visa_free_30 (mutual, no expiry)', () => {
      const r = checkVisaEligibility('SG', 'tourism')
      expect(r.result).toBe('visa_free_30')
      expect(r.policyExpiry).toBeUndefined()
    })

    it('MY + tourism → visa_free_30 (mutual)', () => {
      const r = checkVisaEligibility('MY', 'tourism')
      expect(r.result).toBe('visa_free_30')
    })
  })

  // === 240-Hour Transit ===
  describe('240h transit visa-free', () => {
    const transitCountries = ['US', 'JP', 'GB', 'DE', 'AU', 'KR', 'CA', 'MX', 'ID']
    transitCountries.forEach(code => {
      it(`${code} + transit → transit_240h or visa_free_30`, () => {
        const r = checkVisaEligibility(code, 'transit')
        expect(['transit_240h', 'visa_free_30']).toContain(r.result)
      })
    })
  })

  // === Visa Required ===
  describe('visa required', () => {
    it('IN (India) + tourism → visa_required', () => {
      const r = checkVisaEligibility('IN', 'tourism')
      expect(r.result).toBe('visa_required')
    })

    it('CN (China) + tourism → visa_required', () => {
      const r = checkVisaEligibility('CN', 'tourism')
      expect(r.result).toBe('visa_required')
    })

    it('PH (Philippines) + tourism → visa_required', () => {
      const r = checkVisaEligibility('PH', 'tourism')
      expect(r.result).toBe('visa_required')
    })
  })

  // === Notes should always be present ===
  describe('notes', () => {
    it('all results include notes array', () => {
      const cases = [
        { nat: 'JP', purpose: 'tourism' as const },
        { nat: 'US', purpose: 'transit' as const },
        { nat: 'IN', purpose: 'tourism' as const },
        { nat: 'TH', purpose: 'business' as const },
      ]
      cases.forEach(({ nat, purpose }) => {
        const r = checkVisaEligibility(nat, purpose)
        expect(r.notes).toBeDefined()
        expect(r.notes!.length).toBeGreaterThan(0)
      })
    })
  })
})
