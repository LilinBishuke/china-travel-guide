import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProfile } from './store/userStore'
import ErrorBoundary from './components/ErrorBoundary'

import OnboardingFlow from './pages/onboarding/OnboardingFlow'
import MainApp from './pages/MainApp'

export default function App() {
  const [ready, setReady] = useState(false)
  const [onboardingDone, setOnboardingDone] = useState(false)

  useEffect(() => {
    const profile = getProfile()
    setOnboardingDone(!!profile.onboardingComplete)
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <ErrorBoundary>
    <Routes>
      <Route
        path="/onboarding/*"
        element={<OnboardingFlow onComplete={() => setOnboardingDone(true)} />}
      />
      <Route
        path="/*"
        element={
          onboardingDone
            ? <MainApp />
            : <Navigate to="/onboarding" replace />
        }
      />
    </Routes>
    </ErrorBoundary>
  )
}
