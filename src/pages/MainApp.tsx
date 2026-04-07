import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import BottomTabBar from '../components/BottomTabBar'
import OfflineBanner from '../components/OfflineBanner'

import PreparePage from './prepare/PreparePage'
import ExplorePage from './explore/ExplorePage'
import MyTripRouter from './mytrip/MyTripRouter'
import RatesPage from './rates/RatesPage'
import ToolsPage from './tools/ToolsPage'
import ProfileMain from './profile/ProfileMain'
import EditProfile from './profile/EditProfile'
import NotFound from './NotFound'

export default function MainApp() {
  // Start precache and notification check on mount
  useEffect(() => {
    import('../services/precache').then(m => m.startPrecache())
    import('../services/notificationService').then(m => m.checkAndNotify())
  }, [])

  return (
    <div className="screen">
      <OfflineBanner />
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/prepare" replace />} />
          <Route path="/prepare/*" element={<PreparePage />} />
          <Route path="/explore/*" element={<ExplorePage />} />
          <Route path="/mytrip/*" element={<MyTripRouter />} />
          <Route path="/rates" element={<RatesPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/profile" element={<ProfileMain />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BottomTabBar />
    </div>
  )
}
