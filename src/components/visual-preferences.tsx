// src/components/visual-preferences.tsx
import { type ThemeKey, type Preferences } from '@/lib/types'
import { themes } from '@/lib/themes'
import { Switch } from '@/components/ui/switch'

interface VisualPreferencesProps {
  preferences: Preferences
  setPreferences: React.Dispatch<React.SetStateAction<Preferences>>
  isDarkMode: boolean
  activeTheme: ThemeKey
}

export const VisualPreferences = ({
  preferences,
  setPreferences,
  isDarkMode,
  activeTheme
}: VisualPreferencesProps) => {
  const labels: Record<keyof Preferences, string> = {
    gradients: 'Use gradient colors',
    reduceTransparency: 'Reduce transparency',
    roundedCorners: 'Rounded corners',
    increaseContrast: 'Increase contrast',
    toggleLabels: 'On/Off labels'
  }

  const handlePreferenceChange = (key: keyof Preferences, checked: boolean) => {
    setPreferences((prev: Preferences) => ({ ...prev, [key]: checked }))
  }

  return (
    <div className={`space-y-5 p-5 rounded-xl transition-all duration-700 ${
      isDarkMode 
        ? !preferences.reduceTransparency ? 'bg-slate-800' : 'bg-slate-700'
        : !preferences.reduceTransparency ? 'bg-slate-800/5' : 'bg-slate-100'
    }`}>
      <span className={`text-base font-semibold transition-colors duration-700 ${
        isDarkMode ? themes[activeTheme].headingDark : themes[activeTheme].headingLight
      }`}>
        Visual Preferences
      </span>
      
      <div className="space-y-4">
        {(Object.entries(preferences) as [keyof Preferences, boolean][]).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className={`text-base ${
              isDarkMode 
                ? preferences.increaseContrast ? 'text-white' : 'text-gray-300'
                : preferences.increaseContrast ? 'text-gray-900' : 'text-gray-700'
            }`}>
              {labels[key]}
              {preferences.toggleLabels && value && (
                <span className="ml-2 text-xs font-medium text-gray-500">
                  ON
                </span>
              )}
            </span>
            
            <div className="relative">
              <Switch
                checked={value}
                onCheckedChange={(checked) => handlePreferenceChange(key, checked)}
                className={`
                  ${value 
                    ? preferences.gradients
                      ? `bg-gradient-to-r ${themes[activeTheme].primary}`
                      : themes[activeTheme].solid
                    : 'bg-transparent'
                  }
                  border-2
                  ${value
                    ? isDarkMode ? 'border-white/10' : 'border-transparent'
                    : isDarkMode 
                      ? 'border-slate-400'  // More visible in dark mode
                      : 'border-slate-300'  // More accessible in light mode
                  }
                  relative inline-flex h-6 w-11 shrink-0 cursor-pointer 
                  rounded-full transition-colors duration-200 
                  ease-in-out focus-visible:outline-none focus-visible:ring-2 
                  focus-visible:ring-offset-2 focus-visible:ring-offset-white 
                  dark:focus-visible:ring-offset-slate-900
                  focus-visible:ring-blue-500
                  disabled:cursor-not-allowed disabled:opacity-50
                  ${preferences.increaseContrast ? 'contrast-125' : ''}
                `}
              >
                <span
                  className={`
                    pointer-events-none inline-block h-5 w-5 transform 
                    rounded-full bg-white shadow-lg ring-0 transition 
                    duration-200 ease-in-out translate-x-0
                    ${value ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </Switch>
              {preferences.toggleLabels && value && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white pointer-events-none">
                  ON
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}