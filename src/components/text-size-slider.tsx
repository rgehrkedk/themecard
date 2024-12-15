import { type ThemeKey, type Preferences } from '@/lib/types'
import { themes } from '@/lib/themes'

interface TextSizeSliderProps {
  textSize: number
  setTextSize: (size: number) => void
  isDarkMode: boolean
  activeTheme: ThemeKey
  preferences: Preferences
}

export const TextSizeSlider = ({ 
  textSize, 
  setTextSize, 
  isDarkMode, 
  activeTheme, 
  preferences 
}: TextSizeSliderProps) => {
  return (
    <div className={`space-y-4 p-5 rounded-xl transition-all duration-700 ${
      isDarkMode 
        ? !preferences.reduceTransparency ? 'bg-slate-800' : 'bg-slate-700'
        : !preferences.reduceTransparency ? 'bg-slate-800/5' : 'bg-slate-100'
    }`}>
      <span className={`text-base font-semibold transition-colors duration-700 ${
        isDarkMode ? themes[activeTheme].headingDark : themes[activeTheme].headingLight
      }`}>
        Text Size
      </span>
      
      <div className="px-2 py-4 flex items-center space-x-4">
        {/* Small 'A' on the left */}
        <span className={`text-sm font-medium transition-colors duration-700 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          A
        </span>

        <div className="flex-1 relative h-6">
          {/* Background track */}
          <div className="absolute w-full h-1 top-1/2 -translate-y-1/2 bg-slate-200 dark:bg-slate-700 rounded">
            {/* Colored progress bar */}
            <div 
              className={`absolute h-full left-0 rounded transition-all duration-300 ${
                preferences.gradients 
                  ? `bg-gradient-to-r ${themes[activeTheme].primary}` 
                  : themes[activeTheme].solid
              }`}
              style={{ width: `${(textSize / 4) * 100}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="absolute w-full h-1 top-1/2 -translate-y-1/2 flex justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-0.5 h-4 bg-gray-400 dark:bg-gray-600"></div>
            ))}
          </div>

          {/* Custom range input */}
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value={textSize}
            onChange={(e) => setTextSize(parseInt(e.target.value))}
            className={`
              w-full h-6 appearance-none bg-transparent cursor-pointer rounded-lg
            `}
            style={{
              // Remove default styling
              WebkitAppearance: 'none',
              // Add custom thumb styling
              WebkitTapHighlightColor: 'transparent',
            }}
          />
        </div>

        {/* Large 'A' on the right */}
        <span className={`text-xl font-medium transition-colors duration-700 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          A
        </span>
      </div>
    </div>
  )
}