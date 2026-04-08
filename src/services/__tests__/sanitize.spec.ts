// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import DOMPurify from 'dompurify'

describe('DOMPurify sanitization', () => {
  it('removes script tags', () => {
    const dirty = '<p>Hello</p><script>alert(1)</script>'
    const clean = DOMPurify.sanitize(dirty)
    expect(clean).not.toContain('<script')
    expect(clean).toContain('<p>Hello</p>')
  })

  it('removes onerror attributes', () => {
    const dirty = '<img onerror="alert(1)" src="x">'
    const clean = DOMPurify.sanitize(dirty)
    expect(clean).not.toContain('onerror')
  })

  it('removes javascript: hrefs', () => {
    const dirty = '<a href="javascript:alert(1)">click</a>'
    const clean = DOMPurify.sanitize(dirty)
    expect(clean).not.toContain('javascript:')
  })

  it('removes iframe tags', () => {
    const dirty = '<iframe src="https://evil.com"></iframe><p>safe</p>'
    const clean = DOMPurify.sanitize(dirty)
    expect(clean).not.toContain('<iframe')
    expect(clean).toContain('safe')
  })

  it('preserves safe HTML', () => {
    const safe = '<h2>Title</h2><p>Text with <a href="https://example.com">link</a></p><ul><li>item</li></ul>'
    const clean = DOMPurify.sanitize(safe)
    expect(clean).toContain('<h2>Title</h2>')
    expect(clean).toContain('<a href="https://example.com">')
    expect(clean).toContain('<li>item</li>')
  })
})
