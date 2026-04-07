import { useParams, useNavigate } from 'react-router-dom'
import { getGuideByStyle } from '../../data/travelStyleGuides'
import { getCityById } from '../../data/cities'
import Icon from '../../components/Icon'
import type { TravelStyle } from '../../store/userStore'

export default function StyleGuideDetail() {
  const { style } = useParams<{ style: string }>()
  const navigate = useNavigate()
  const guide = style ? getGuideByStyle(style as TravelStyle) : undefined

  if (!guide) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-secondary">Guide not found</p>
      </div>
    )
  }

  const recommendedCities = guide.recommended
    .map(id => getCityById(id))
    .filter(Boolean)

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <Icon name={guide.iconName} size={20} color="#E8342A" />
        <h2 className="text-base font-semibold text-navy">{guide.title}</h2>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5 pb-10">
        {/* Overview */}
        <div className="card p-5">
          <p className="text-sm text-navy leading-relaxed">{guide.overview}</p>
        </div>

        {/* Tips */}
        <div className="card p-5">
          <p className="section-header">Tips</p>
          <div className="flex flex-col gap-2">
            {guide.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-navy leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regulations */}
        {guide.regulations.length > 0 && (
          <div className="card p-5 border-l-4 border-warning">
            <p className="section-header">規制・注意事項</p>
            <div className="flex flex-col gap-2">
              {guide.regulations.map((reg, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Icon name="visa_required" size={14} color="#F39C12" className="shrink-0 mt-1" />
                  <p className="text-sm text-navy leading-relaxed">{reg}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended cities */}
        {recommendedCities.length > 0 && (
          <div>
            <p className="section-header">おすすめ都市</p>
            <div className="flex flex-col gap-2">
              {recommendedCities.map(city => city && (
                <button
                  key={city.id}
                  onClick={() => navigate(`/explore/city/${city.id}`)}
                  className="card p-4 flex items-center gap-3 active:opacity-70 transition-opacity text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-navy">{city.name}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{city.name}</p>
                    <p className="text-xs text-text-secondary">{city.description}</p>
                  </div>
                  <svg className="text-gray-300 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
