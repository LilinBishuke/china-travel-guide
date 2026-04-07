import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-bg-app">
      <Icon name="globe" size={48} color="#9CA3AF" className="mb-4" />
      <h1 className="text-xl font-bold text-navy mb-1">ページが見つかりません</h1>
      <p className="text-sm text-text-secondary text-center mb-6">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <button className="btn-primary w-48" onClick={() => navigate('/', { replace: true })}>
        ホームに戻る
      </button>
    </div>
  )
}
