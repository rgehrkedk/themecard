// src/components/text-size-slider.tsx
import { type ThemeKey, type Preferences } from '@/lib/types'
import { themes } from '@/lib/themes'

export interface TextSizeSliderProps {
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
        <span className={`text-xs font-medium transition-colors duration-700 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          A
        </span>

        <div className="flex-1 relative h-6">
          {/* Background track and progress bar container */}
          <div className="absolute w-full h-1 top-1/2 -translate-y-1/2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden z-0">
            {/* Colored progress bar */}
            <div 
              className={`absolute h-full left-0 rounded-full transition-all duration-300 ${
                preferences.gradients 
                  ? `bg-gradient-to-r ${themes[activeTheme].primary}` 
                  : themes[activeTheme].solid
              }`}
              style={{ width: `${(textSize / 4) * 100}%` }}
            />
          </div>

          {/* Custom range input */}
          <input
            type="range"
            min="0"
            max="4"
            step="0.1"
            value={textSize}
            onChange={(e) => setTextSize(parseFloat(e.target.value))}
            className={`
              relative z-10
              w-full h-6 appearance-none bg-transparent cursor-pointer
              [&::-webkit-slider-thumb]:relative
              [&::-webkit-slider-thumb]:z-20
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-slate-200
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:relative
              [&::-moz-range-thumb]:z-20
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-slate-200
              [&::-moz-range-thumb]:transition-all
              [&::-moz-range-thumb]:duration-150
              [&::-moz-range-thumb]:hover:scale-110
              [&::-webkit-slider-runnable-track]:bg-transparent
              [&::-moz-range-track]:bg-transparent
              focus:outline-none
            `}
            style={{
              WebkitAppearance: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          />
        </div>

        {/* Large 'A' on the right */}
        <span className={`text-2xl font-medium transition-colors duration-700 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          A
        </span>
      </div>
    </div>
  )
}