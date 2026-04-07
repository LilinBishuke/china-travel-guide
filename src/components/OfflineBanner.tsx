import { useOnlineStatus } from '../hooks/useOnlineStatus'

export default function OfflineBanner() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div className="bg-warning text-white text-xs font-medium text-center py-1.5 px-4">
      オフラインモード — キャッシュデータを表示中
    </div>
  )
}
