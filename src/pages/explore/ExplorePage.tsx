import { Routes, Route } from 'react-router-dom'
import ExploreMain from './ExploreMain'
import CityDetail from './CityDetail'
import StyleGuideDetail from './StyleGuideDetail'

export default function ExplorePage() {
  return (
    <Routes>
      <Route path="/" element={<ExploreMain />} />
      <Route path="/city/:id" element={<CityDetail />} />
      <Route path="/style/:style" element={<StyleGuideDetail />} />
    </Routes>
  )
}
