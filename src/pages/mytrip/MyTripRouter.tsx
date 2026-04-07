import { Routes, Route } from 'react-router-dom'
import MyTripPage from './MyTripPage'
import ItineraryDetail from './ItineraryDetail'

export default function MyTripRouter() {
  return (
    <Routes>
      <Route path="/" element={<MyTripPage />} />
      <Route path="/:id" element={<ItineraryDetail />} />
    </Routes>
  )
}
