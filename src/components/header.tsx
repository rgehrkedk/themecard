// components/header.tsx
import { Sparkles } from 'lucide-react'
import { type ThemeKey } from '@/lib/types'
import { themes } from '@/lib/themes'

interface HeaderProps {
  isDarkMode: boolean
  activeTheme: ThemeKey
}

export const Header = ({ isDarkMode, activeTheme }: HeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-lg transition-colors duration-700 ${
        isDarkMode 
          ? `bg-${themes[activeTheme].accent}/20` 
          : `bg-${themes[activeTheme].accent}/10`
      }`}>
        <Sparkles 
          className={`w-6 h-6 transition-colors duration-700 ${
            isDarkMode ? themes[activeTheme].accentDark : themes[activeTheme].accent
          }`} 
        />
      </div>
      
      <h3 className={`text-2xl font-bold transition-colors duration-700 ${
        isDarkMode ? themes[activeTheme].headingDark : themes[activeTheme].headingLight
      }`}>
        Display Settings
      </h3>
    </div>
  )
}