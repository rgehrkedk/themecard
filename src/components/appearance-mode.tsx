// components/appearance-mode.tsx
import { type ThemeKey, type Preferences } from '@/lib/types'
import { themes } from '@/lib/themes'
import { Sun, Moon } from 'lucide-react'

interface AppearanceModeProps {
  appearance: 'auto' | 'light' | 'dark'
  setAppearance: (mode: 'auto' | 'light' | 'dark') => void
  isDarkMode: boolean
  activeTheme: ThemeKey
  preferences: Preferences
}

export const AppearanceMode = ({
  appearance,
  setAppearance,
  isDarkMode,
  activeTheme,
  preferences
}: AppearanceModeProps) => {
  const modes: ('auto' | 'light' | 'dark')[] = ['auto', 'light', 'dark']

  const getIcon = (mode: 'auto' | 'light' | 'dark') => {
    switch (mode) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      default:
        return 'Auto'
    }
  }

  return (
    <div className={`space-y-4 p-5 rounded-xl transition-all duration-700 ${
      isDarkMode 
        ? !preferences.reduceTransparency ? 'bg-slate-800' : 'bg-slate-700'
        : !preferences.reduceTransparency ? 'bg-slate-800/5' : 'bg-slate-100'
    }`}>
      <span className={`text-base font-semibold transition-colors duration-700 ${
        isDarkMode ? themes[activeTheme].headingDark : themes[activeTheme].headingLight
      }`}>
        Appearance Mode
      </span>

      <div className={`p-1 rounded-lg h-10 transition-colors duration-700 ${
        isDarkMode ? 'bg-slate-700' : 'bg-slate-700/10'
      }`}>
        <div className="relative h-full grid grid-cols-3">
          {/* Sliding background */}
          <div 
            className={`absolute h-full w-1/3 rounded-md transition-all duration-500 transform ${
              preferences.gradients 
                ? `bg-gradient-to-r ${themes[activeTheme].primary}` 
                : themes[activeTheme].solid
            } ${
              appearance === 'auto' ? 'translate-x-0' :
              appearance === 'light' ? 'translate-x-full' :
              'translate-x-[200%]'
            }`}
          />

          {/* Mode buttons */}
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setAppearance(mode)}
              className={`
                relative z-10 
                flex items-center justify-center 
                font-medium text-sm
                transition-colors duration-700
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-offset-white 
                dark:focus:ring-offset-slate-900 
                focus:ring-blue-500
                rounded-md
                ${appearance === mode 
                  ? 'text-white' 
                  : isDarkMode 
                    ? preferences.increaseContrast ? 'text-gray-300' : 'text-gray-400'
                    : preferences.increaseContrast ? 'text-gray-900' : 'text-gray-600'
                }
              `}
            >
              {getIcon(mode)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}