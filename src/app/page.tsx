"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { AppearanceMode } from '@/components/appearance-mode'
import { TextSizeSlider } from '@/components/text-size-slider'
import { ThemeSelector } from '@/components/theme-selector'
import { VisualPreferences } from '@/components/visual-preferences'
import { type Preferences, type ThemeKey } from '@/lib/types'
import { themes } from '@/lib/themes'

export default function Page() {
  // State management
  const [appearance, setAppearance] = useState<'auto' | 'light' | 'dark'>('auto')
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
  const [textSize, setTextSize] = useState(2)
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('blue')
  const [preferences, setPreferences] = useState<Preferences>({
    gradients: true,
    reduceTransparency: false,
    roundedCorners: true,
    increaseContrast: false,
    toggleLabels: false
  })

  // System theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light')
    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }, [])

  const isDarkMode = appearance === 'dark' || (appearance === 'auto' && systemTheme === 'dark')

  // Update global font size based on textSize state
  useEffect(() => {
    const newSize = 16 + textSize * 2 // Adjust the multiplier as needed
    document.documentElement.style.setProperty('--global-font-size', `${newSize}px`)
  }, [textSize])

  // Reset preferences handler
  const handleReset = () => {
    setAppearance('auto')
    setTextSize(2)
    setActiveTheme('blue')
    setPreferences({
      gradients: true,
      reduceTransparency: false,
      roundedCorners: true,
      increaseContrast: false,
      toggleLabels: false
    })
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${
      preferences.gradients ? 'bg-gradient-to-br' : ''
    } ${
      preferences.increaseContrast
        ? isDarkMode ? 'bg-black' : 'bg-white'
        : isDarkMode 
          ? preferences.gradients ? 'from-slate-800 via-slate-900 to-slate-800' : 'bg-slate-900'
          : preferences.gradients ? 'from-slate-100 via-slate-200 to-slate-100' : 'bg-slate-100'
    } p-4 transition-all duration-700`}>
      <div className="relative w-full max-w-md">
        <div className={`relative ${
          !preferences.reduceTransparency ? 'backdrop-blur-lg' : ''
        } ${
          preferences.roundedCorners ? 'rounded-2xl' : 'rounded-none'
        } shadow-xl ${
          isDarkMode 
            ? !preferences.reduceTransparency ? 'bg-slate-900/40' : preferences.increaseContrast ? 'bg-black' : 'bg-slate-800'
            : !preferences.reduceTransparency ? 'bg-white/60' : preferences.increaseContrast ? 'bg-white' : 'bg-slate-100'
        } ${
          preferences.roundedCorners ? 'border' : 'border-y'
        } ${
          isDarkMode ? 'border-slate-700' : 'border-slate-200'
        } transition-all duration-700`}>
          <div className="space-y-8 p-8" style={{ fontSize: 'var(--global-font-size)' }}>
            <Header isDarkMode={isDarkMode} activeTheme={activeTheme} />
            
            <div className="space-y-6">
              <AppearanceMode 
                appearance={appearance}
                setAppearance={setAppearance}
                isDarkMode={isDarkMode}
                activeTheme={activeTheme}
                preferences={preferences}
              />
              
              <TextSizeSlider
                textSize={textSize}
                setTextSize={setTextSize}
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
              
              <VisualPreferences
                preferences={preferences}
                setPreferences={setPreferences}
                isDarkMode={isDarkMode}
                activeTheme={activeTheme}
              />

              <div className="flex flex-col space-y-4 pt-4">
                <Button 
                  className={`w-full font-semibold py-6 transition-all duration-700 ${
                    preferences.gradients
                      ? `bg-gradient-to-r shadow-lg ${themes[activeTheme].primary} ${themes[activeTheme].hover}`
                      : `${themes[activeTheme].solid} ${themes[activeTheme].solidHover}`
                  } text-white`}
                >
                  Save Preferences
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleReset}
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
    </div>
  )
}