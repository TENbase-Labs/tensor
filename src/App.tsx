import { useEffect } from 'react'
import { getTheme, setTheme } from './themes'

function App() {
  // Set theme on initial load
  useEffect(() => {
    setTheme(getTheme())
  }, [])

  const toggleTheme = () => {
    const current = getTheme()
    const next = current === 'roundvision' ? 'tenbase' : 'roundvision'
    setTheme(next)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tensor Design System</h1>
        <p className="text-gray-600">Multi-brand design system for TENbase Labs</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Toggle Theme (Current: {getTheme()})
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
