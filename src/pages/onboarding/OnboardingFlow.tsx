import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveProfile } from '../../store/userStore'
import type { Language, TripPurpose, TravelStyle, Interest } from '../../store/userStore'

import OB1Welcome from './OB1Welcome'
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
    saveProfile({ ...draft, onboardingComplete: true } as any)
    onComplete()
    navigate('/', { replace: true })
  }

  const steps = [
    // Step 0: Welcome + Language selection
    <OB1Welcome
      key={0}
      onNext={(lang) => nextStep({ language: lang })}
    />,

    // Step 1: Passport (nationality + purpose combined)
    <OB2Passport
      key={1}
      lang={draft.language ?? 'ja'}
      onNext={(code, name, purpose) => nextStep({ nationality: code, nationalityName: name, tripPurpose: purpose })}
    />,

    // Step 2: Travel style
    <OB3Style
      key={2}
      lang={draft.language ?? 'ja'}
      onNext={(styles) => nextStep({ travelStyles: styles })}
    />,

    // Step 3: Visa result
    <OB4VisaResult
      key={3}
      lang={draft.language ?? 'ja'}
      nationality={draft.nationality ?? ''}
      nationalityName={draft.nationalityName ?? ''}
      purpose={draft.tripPurpose ?? 'tourism'}
      onNext={() => nextStep()}
    />,

    // Step 4: Entry port + date
    <OB5Entry
      key={4}
      lang={draft.language ?? 'ja'}
      onNext={(port, portName, date) => nextStep({ entryPort: port, entryPortName: portName, departureDate: date })}
    />,

    // Step 5: Interests
    <OB6Interests
      key={5}
      lang={draft.language ?? 'ja'}
      onNext={(interests) => nextStep({ interests })}
    />,

    // Step 6: Setup complete
    <OB7SetupComplete
      key={6}
      lang={draft.language ?? 'ja'}
      nationality={draft.nationality ?? ''}
      nationalityName={draft.nationalityName ?? ''}
      purpose={draft.tripPurpose ?? 'tourism'}
      travelStyles={draft.travelStyles ?? []}
      interests={draft.interests ?? []}
      departureDate={draft.departureDate ?? ''}
      onComplete={finish}
    />,
  ]

  return (
    <div className="min-h-screen bg-bg-app">
      {steps[step]}
    </div>
  )
}
