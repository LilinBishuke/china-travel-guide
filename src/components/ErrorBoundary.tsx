import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: string
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-bg-app">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 20h20L12 2z" stroke="#E8342A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9v4M12 16h.01" stroke="#E8342A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-lg font-bold text-navy mb-1">エラーが発生しました</h2>
          <p className="text-sm text-text-secondary text-center mb-4">
            予期せぬエラーが発生しました。ページを再読み込みしてください。
          </p>
          <p className="text-xs text-text-secondary bg-gray-100 rounded-lg px-3 py-2 mb-6 max-w-full overflow-hidden text-ellipsis">
            {this.state.error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary w-48"
          >
            再読み込み
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
