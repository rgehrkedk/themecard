// components/theme-selector.tsx
import { type ThemeKey, type Preferences } from '@/lib/types'
import { themes } from '@/lib/themes'

interface ThemeSelectorProps {
  activeTheme: ThemeKey
  setActiveTheme: (theme: ThemeKey) => void
  isDarkMode: boolean
  preferences: Preferences
}

export const ThemeSelector = ({ 
  activeTheme, 
  setActiveTheme, 
  isDarkMode, 
  preferences 
}: ThemeSelectorProps) => {
  return (
    <div className={`space-y-4 p-5 rounded-xl transition-all duration-700 ${
      isDarkMode 
        ? !preferences.reduceTransparency ? 'bg-slate-800' : 'bg-slate-700'
        : !preferences.reduceTransparency ? 'bg-slate-800/5' : 'bg-slate-100'
    }`}>
      <span className={`text-base font-semibold transition-colors duration-700 ${
        isDarkMode ? themes[activeTheme].headingDark : themes[activeTheme].headingLight
      }`}>
        Theme Color
      </span>

      <div className="grid grid-cols-4 gap-3 h-10">
        {(Object.entries(themes)).map(([theme, colors]) => (
          <button
            key={theme}
            onClick={() => setActiveTheme(theme as ThemeKey)}
            className={`
              h-full 
              rounded-lg 
              transition-all 
              duration-200 
              ${preferences.gradients 
                ? theme === 'teal'
                  ? 'bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400' 
                  : `bg-gradient-to-r ${colors.primary}`
                : colors.solid
              }
              ${activeTheme === theme 
                ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-gray-400' 
                : ''
              }
              hover:opacity-90
              focus:outline-none 
              focus:ring-2 
              focus:ring-offset-2 
              focus:ring-offset-white 
              dark:focus:ring-offset-slate-900 
              focus:ring-gray-400
            `}
            aria-label={`Select ${theme} theme`}
          />
        ))}
      </div>
    </div>
  )
}