import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCityById } from '../../data/cities'
import { getCityArticle, type CityArticle } from '../../services/wikivoyageService'
import DOMPurify from 'dompurify'
import Icon from '../../components/Icon'

type Tab = 'overview' | 'videos' | 'blogs' | 'practical'

export default function CityDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const city = id ? getCityById(id) : undefined
  const [article, setArticle] = useState<CityArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  useEffect(() => {
    if (!city) return
    let mounted = true
    setLoading(true)
    getCityArticle(city.wikivoyageSlug).then(a => {
      if (mounted) { setArticle(a); setLoading(false) }
    })
    return () => { mounted = false }
  }, [city?.wikivoyageSlug])

  if (!city) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-secondary">City not found</p>
      </div>
    )
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: '概要' },
    { key: 'videos', label: '動画' },
    ...(city.blogLinks.length > 0 ? [{ key: 'blogs' as Tab, label: '体験記' }] : []),
    ...(city.airportGuide ? [{ key: 'practical' as Tab, label: '実用情報' }] : []),
  ]

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      {/* Header */}
      <div className="px-5 pt-safe pt-4 pb-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-navy">{city.name}</h1>
            <p className="text-xs text-text-secondary">{city.nameEn} · {city.description}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex gap-1.5 flex-wrap mt-3">
          {city.highlights.map(h => (
            <span key={h} className="chip chip-blue text-[10px]">{h}</span>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-3 -mb-px">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-medium transition-colors ${
                activeTab === tab.key ? 'bg-bg-app text-primary font-semibold' : 'text-text-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-5 py-5 flex-1">
        {/* Overview tab */}
        {activeTab === 'overview' && (
          loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : article ? (
            <div className="card p-4">
              <div
                className="prose prose-sm max-w-none text-navy [&_a]:text-primary [&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_ul]:pl-4 [&_li]:text-sm"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.html) }}
              />
              <p className="text-[10px] text-text-secondary mt-4 text-center">
                Source: Wikivoyage (CC BY-SA 3.0)
              </p>
            </div>
          ) : (
            <div className="card p-5 text-center">
              <Icon name="globe" size={32} color="#9CA3AF" className="mx-auto mb-2" />
              <p className="text-sm text-text-secondary">記事を取得できませんでした</p>
            </div>
          )
        )}

        {/* Videos tab */}
        {activeTab === 'videos' && (
          <div className="flex flex-col gap-3">
            {city.youtubeIds.length > 0 ? city.youtubeIds.map(vid => (
              <div key={vid} className="rounded-xl overflow-hidden bg-black aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${vid}`}
                  title="YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            )) : (
              <p className="text-sm text-text-secondary text-center py-8">動画はまだありません</p>
            )}
          </div>
        )}

        {/* Blogs tab */}
        {activeTab === 'blogs' && (
          <div className="flex flex-col gap-3">
            {city.blogLinks.map((blog, i) => (
              <a
                key={i}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 flex items-start gap-3 active:opacity-70 transition-opacity"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="book" size={18} color="#E8342A" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{blog.title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{blog.author} · {blog.year}</p>
                  <div className="flex gap-1 mt-1.5">
                    {blog.tags.map(tag => (
                      <span key={tag} className="text-[9px] bg-gray-100 text-text-secondary px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                    <span className="text-[9px] bg-gray-100 text-text-secondary px-1.5 py-0.5 rounded uppercase">{blog.lang}</span>
                  </div>
                </div>
                <svg className="text-gray-300 shrink-0 mt-1" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>
        )}

        {/* Practical info tab */}
        {activeTab === 'practical' && city.airportGuide && (
          <div className="flex flex-col gap-4">
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="airplane" size={18} color="#E8342A" />
                <p className="text-sm font-bold text-navy">{city.airportGuide.code} 空港ガイド</p>
              </div>

              <p className="text-xs font-semibold text-text-secondary mb-1.5">入国時のポイント</p>
              {city.airportGuide.arrivalTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p className="text-xs text-navy">{tip}</p>
                </div>
              ))}

              <p className="text-xs font-semibold text-text-secondary mt-3 mb-1.5">SIM購入</p>
              <p className="text-xs text-navy">{city.airportGuide.simPurchase}</p>

              <p className="text-xs font-semibold text-text-secondary mt-3 mb-1.5">市内への交通</p>
              {city.airportGuide.transport.map((t, i) => (
                <div key={i} className="flex items-start gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p className="text-xs text-navy">{t}</p>
                </div>
              ))}

              {city.airportGuide.tips.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-text-secondary mt-3 mb-1.5">Tips</p>
                  {city.airportGuide.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                      <p className="text-xs text-navy">{tip}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
