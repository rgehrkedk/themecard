// src/components/display-settings.tsx
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppearanceMode } from "./appearance-mode"
import { TextSizeSlider } from "./text-size-slider"
import { ThemeSelector } from "./theme-selector"
import { VisualPreferences } from "./visual-preferences"
import { type ThemeKey, type Preferences } from '@/lib/types'
import { themes } from '@/lib/themes'
import { useEffect } from "react"

interface DisplaySettingsProps {
  isOpen: boolean
  onClose: () => void
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

export function DisplaySettings({
  isOpen,
  onClose,
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
}: DisplaySettingsProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      {/* Backdrop with improved transition */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen 
            ? 'bg-black/50 backdrop-blur-sm' 
            : 'bg-black/0 backdrop-blur-none pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      />
      
      {/* Settings Panel Container with improved mobile spacing */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        {/* Settings Panel */}
        <div 
          className={`relative w-full max-w-md overflow-y-auto pointer-events-auto
            transform transition-all duration-500 ease-out
            rounded-xl shadow-lg
            max-h-[calc(100vh-8rem)]
            ${isOpen 
              ? 'scale-100 translate-y-0 opacity-100' 
              : 'scale-95 translate-y-8 opacity-0'
            }
            ${isDarkMode 
              ? !preferences.reduceTransparency ? 'bg-slate-900/70' : 'bg-slate-900'
              : !preferences.reduceTransparency ? 'bg-white/70' : 'bg-white'
            } backdrop-blur-md`}
        >
          <div className="h-full overflow-y-auto px-6 py-6">
            <div className="flex items-center justify-between pb-4">
              <h2 className={`text-lg font-semibold transition-colors duration-700 ${
                isDarkMode ? themes[activeTheme].headingDark : themes[activeTheme].headingLight
              }`}>
                Display Settings
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <div className="space-y-6">
              <AppearanceMode 
                appearance={appearance}
                setAppearance={setAppearance}
                isDarkMode={isDarkMode}
                activeTheme={activeTheme}
                preferences={preferences}
              />
              
              <ThemeSelector
                activeTheme={activeTheme}
                setActiveTheme={setActiveTheme}
                isDarkMode={isDarkMode}
                preferences={preferences}
              />

              <TextSizeSlider
                textSize={textSize}
                setTextSize={setTextSize}
                isDarkMode={isDarkMode}
                activeTheme={activeTheme}
                preferences={preferences}
              />

              <VisualPreferences
                preferences={preferences}
                setPreferences={setPreferences}
                isDarkMode={isDarkMode}
                activeTheme={activeTheme}
              />

              <div className="flex flex-col space-y-4 pt-4 pb-2">
                <Button 
                  onClick={onClose}
                  className={`w-full font-semibold py-6 transition-all duration-700 ${
                    preferences.gradients
                      ? `bg-gradient-to-r shadow-lg ${themes[activeTheme].primary} ${themes[activeTheme].hover}`
                      : `${themes[activeTheme].solid} ${themes[activeTheme].solidHover}`
                  } text-white`}
                >
                  Done
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    onReset()
                    onClose()
                  }}
                  className={`w-full border-2 font-semibold bg-transparent py-6 transition-all duration-700 ${
                    isDarkMode 
                      ? `${themes[activeTheme].border} ${themes[activeTheme].accentDark} hover:bg-slate-800`
                      : `${themes[activeTheme].border} ${themes[activeTheme].accent} hover:bg-slate-50`
                  }`}
                >
                  Reset to Default
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}