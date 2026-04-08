import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveProfile } from '../../store/userStore'
import type { Language, TripPurpose, TravelStyle, Interest, VisitCount } from '../../store/userStore'

import OB1Welcome from './OB1Welcome'
import OB1bVisitCount from './OB1bVisitCount'
import OB2Passport from './OB2Passport'
import OB3Style from './OB3Style'
import OB4VisaResult from './OB4VisaResult'
import OB5Entry from './OB5Entry'
import OB6Interests from './OB6Interests'
import OB7SetupComplete from './OB7SetupComplete'

interface Props {
  onComplete: () => void
}

interface Draft {
  language?: Language
  visitCount?: VisitCount
  nationality?: string
  nationalityName?: string
  tripPurpose?: TripPurpose
  travelStyles?: TravelStyle[]
  entryPort?: string
  entryPortName?: string
  departureDate?: string
  interests?: Interest[]
}

export default function OnboardingFlow({ onComplete }: Props) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Draft>({})

  function update(data: Partial<Draft>) {
    setDraft(prev => ({ ...prev, ...data }))
  }

  function nextStep(data?: Partial<Draft>) {
    if (data) update(data)
    setStep(s => s + 1)
  }

  function finish() {
    saveProfile({
      language: draft.language ?? 'en',
      nationality: draft.nationality ?? '',
      nationalityName: draft.nationalityName ?? '',
      tripPurpose: draft.tripPurpose ?? 'tourism',
      travelStyles: draft.travelStyles ?? [],
      entryPort: draft.entryPort ?? '',
      entryPortName: draft.entryPortName ?? '',
      departureDate: draft.departureDate ?? '',
      interests: draft.interests ?? [],
      visitCount: draft.visitCount ?? 'first',
      onboardingComplete: true,
    })
    onComplete()
    navigate('/', { replace: true })
  }

  const steps = [
    // Step 0: Welcome + Language
    <OB1Welcome key={0} onNext={(lang) => nextStep({ language: lang })} />,

    // Step 1: Visit count (NEW)
    <OB1bVisitCount key={1} lang={draft.language ?? 'ja'} onNext={(count) => nextStep({ visitCount: count })} />,

    // Step 2: Passport (nationality + purpose)
    <OB2Passport key={2} lang={draft.language ?? 'ja'} onNext={(code, name, purpose) => nextStep({ nationality: code, nationalityName: name, tripPurpose: purpose })} />,

    // Step 3: Travel style
    <OB3Style key={3} lang={draft.language ?? 'ja'} onNext={(styles) => nextStep({ travelStyles: styles })} />,

    // Step 4: Visa result
    <OB4VisaResult key={4} lang={draft.language ?? 'ja'} nationality={draft.nationality ?? ''} nationalityName={draft.nationalityName ?? ''} purpose={draft.tripPurpose ?? 'tourism'} onNext={() => nextStep()} />,

    // Step 5: Entry port + date
    <OB5Entry key={5} lang={draft.language ?? 'ja'} onNext={(port, portName, date) => nextStep({ entryPort: port, entryPortName: portName, departureDate: date })} />,

    // Step 6: Interests
    <OB6Interests key={6} lang={draft.language ?? 'ja'} onNext={(interests) => nextStep({ interests })} />,

    // Step 7: Setup complete
    <OB7SetupComplete key={7} lang={draft.language ?? 'ja'} nationality={draft.nationality ?? ''} nationalityName={draft.nationalityName ?? ''} purpose={draft.tripPurpose ?? 'tourism'} travelStyles={draft.travelStyles ?? []} interests={draft.interests ?? []} departureDate={draft.departureDate ?? ''} onComplete={finish} />,
  ]

  return (
    <div className="min-h-screen bg-bg-app">
      {steps[step]}
    </div>
  )
}
