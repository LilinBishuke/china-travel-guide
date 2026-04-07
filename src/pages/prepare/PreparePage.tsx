import { Routes, Route } from 'react-router-dom'
import PrepareMain from './PrepareMain'
import VisaResult from './VisaResult'
import VisaProgressPage from './VisaProgressPage'
import GFWGuide from './GFWGuide'
import PaymentSetup from './PaymentSetup'
import EmergencyContacts from './EmergencyContacts'

export default function PreparePage() {
  return (
    <Routes>
      <Route path="/" element={<PrepareMain />} />
      <Route path="/visa" element={<VisaResult />} />
      <Route path="/visa-progress" element={<VisaProgressPage />} />
      <Route path="/gfw" element={<GFWGuide />} />
      <Route path="/payment" element={<PaymentSetup />} />
      <Route path="/emergency" element={<EmergencyContacts />} />
    </Routes>
  )
}
