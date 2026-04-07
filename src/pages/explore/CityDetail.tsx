import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCityById } from '../../data/cities'
import { getCityArticle, type CityArticle } from '../../services/wikivoyageService'
import Icon from '../../components/Icon'

export default function CityDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const city = id ? getCityById(id) : undefined
  const [article, setArticle] = useState<CityArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (!city) return
    getCityArticle(city.wikivoyageSlug).then(a => {
      setArticle(a)
      setLoading(false)
    })
  }, [city])

  if (!city) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-secondary">City not found</p>
      </div>
    )
  }

  // Parse sections from article
  const sections = article?.sections ?? []
  const tabNames = ['概要', ...sections.slice(0, 5)]

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      {/* Header */}
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100">
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
      </div>

      {/* Highlights */}
      <div className="px-5 py-4 bg-white border-b border-gray-50">
        <p className="text-xs font-semibold text-text-secondary mb-2">見どころ</p>
        <div className="flex gap-2 flex-wrap">
          {city.highlights.map(h => (
            <span key={h} className="chip chip-blue text-[10px]">{h}</span>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      {sections.length > 0 && (
        <div className="flex gap-1 overflow-x-auto scrollbar-hide px-5 py-2 bg-white border-b border-gray-50">
          {tabNames.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
                activeTab === i ? 'bg-primary text-white' : 'text-text-secondary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="px-5 py-5 flex-1">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : article ? (
          <div className="card p-4">
            <div
              className="prose prose-sm max-w-none text-navy [&_a]:text-primary [&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_ul]:pl-4 [&_li]:text-sm"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
            <p className="text-[10px] text-text-secondary mt-4 text-center">
              Source: Wikivoyage (CC BY-SA 3.0)
            </p>
          </div>
        ) : (
          <div className="card p-5 text-center">
            <Icon name="globe" size={32} color="#9CA3AF" className="mx-auto mb-2" />
            <p className="text-sm text-text-secondary">記事を取得できませんでした</p>
            <p className="text-xs text-text-secondary mt-1">オフラインモードではキャッシュ済みの都市のみ表示可能です</p>
          </div>
        )}

        {/* YouTube videos */}
        {city.youtubeIds.length > 0 && (
          <div className="mt-5">
            <p className="text-sm font-bold text-navy mb-3">おすすめ動画</p>
            <div className="flex flex-col gap-3">
              {city.youtubeIds.map(vid => (
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
