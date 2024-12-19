// src/components/site-header.tsx
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"
import { useState } from "react"
import { DisplaySettings } from "./display-settings"
import { type ThemeKey, type Preferences } from '@/lib/types'
import { themes } from '@/lib/themes'

interface SiteHeaderProps {
  appearance: 'auto' | 'light' | 'dark'
  setAppearance: (mode: 'auto' | 'light' | 'dark') => void
  isDarkMode: boolean
  activeTheme: ThemeKey
  preferences: Preferences
  setPreferences: React.Dispatch<React.SetStateAction<Preferences>>
  textSize: number
  setTextSize: (size: number) => void
  setActiveTheme: (theme: ThemeKey) => void
  onReset: () => void
}

export function SiteHeader({
  appearance,
  setAppearance,
  isDarkMode,
  activeTheme,
  preferences,
  setPreferences,
  textSize,
  setTextSize,
  setActiveTheme,
  onReset
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-700 ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-700' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <div className="flex items-center space-x-2">
              <span className={`text-base font-bold transition-colors duration-700 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Theme Card
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button
              variant="solid" // Corrected variant value
              onClick={() => setIsOpen(true)}
              className={`relative px-4 py-2 transition-all duration-300 ${
                preferences.gradients
                  ? `bg-gradient-to-r shadow-lg ${themes[activeTheme].primary} ${themes[activeTheme].hover}`
                  : `${themes[activeTheme].solid} ${themes[activeTheme].solidHover}`
              } text-white`}
            >
              <Palette className="h-5 w-5 mr-2" />
              <span>Theme</span>
            </Button>
          </div>
        </div>
      </header>

      <DisplaySettings
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        appearance={appearance}
        setAppearance={setAppearance}
        isDarkMode={isDarkMode}
        activeTheme={activeTheme}
        preferences={preferences}
        setPreferences={setPreferences}
        textSize={textSize}
        setTextSize={setTextSize}
        setActiveTheme={setActiveTheme}
        onReset={onReset}
      />
    </>
  )
}