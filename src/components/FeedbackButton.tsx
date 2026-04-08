import { useState } from 'react'

interface Props {
  pageId: string
}

const STORAGE_KEY = 'ctg_feedback'

export default function FeedbackButton({ pageId }: Props) {
  const [submitted, setSubmitted] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      return !!data[pageId]
    } catch { return false }
  })

  function submit(helpful: boolean) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      data[pageId] = { helpful, ts: Date.now() }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {}
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-[10px] text-text-secondary text-center py-3">
        フィードバックありがとうございます
      </p>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 py-3">
      <span className="text-[10px] text-text-secondary">この情報は役に立ちましたか？</span>
      <button onClick={() => submit(true)} className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center active:opacity-70" aria-label="Helpful">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" stroke="#27AE60" strokeWidth="1.5"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" stroke="#27AE60" strokeWidth="1.5"/></svg>
      </button>
      <button onClick={() => submit(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:opacity-70" aria-label="Not helpful">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" stroke="#9CA3AF" strokeWidth="1.5"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" stroke="#9CA3AF" strokeWidth="1.5"/></svg>
      </button>
    </div>
  )
}
