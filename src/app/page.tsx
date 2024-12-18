// src/app/page.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { SiteHeader } from '@/components/site-header'
import { type Preferences, type ThemeKey } from '@/lib/types'

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
    <div className={`min-h-screen ${
      preferences.gradients ? 'bg-gradient-to-br' : ''
    } ${
      preferences.increaseContrast
        ? isDarkMode ? 'bg-black' : 'bg-white'
        : isDarkMode 
          ? preferences.gradients ? 'from-slate-800 via-slate-900 to-slate-800' : 'bg-slate-900'
          : preferences.gradients ? 'from-slate-100 via-slate-200 to-slate-100' : 'bg-slate-100'
    } transition-all duration-700`}>
      <SiteHeader
        appearance={appearance}
        setAppearance={setAppearance}
        isDarkMode={isDarkMode}
        activeTheme={activeTheme}
        preferences={preferences}
        setPreferences={setPreferences}
        textSize={textSize}
        setTextSize={setTextSize}
        setActiveTheme={setActiveTheme}
        onReset={handleReset}
      />
      <main className="container py-6">
        {/* Your main content goes here */}
        <div className="flex items-center justify-center">
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Welcome to Theme Card
          </h1>
        </div>
      </main>
    </div>
  )
}