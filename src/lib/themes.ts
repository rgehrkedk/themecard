// lib/themes.ts
import { Themes } from './types'

export const themes: Themes = {
  blue: {
    primary: 'from-blue-500 to-indigo-500',
    hover: 'hover:from-blue-600 hover:to-indigo-600',
    solid: 'bg-blue-500',
    solidHover: 'hover:bg-blue-600',
    accent: 'text-blue-600',
    accentDark: 'text-blue-300',
    border: 'border-blue-500',
    headingLight: 'text-blue-950',
    headingDark: 'text-blue-50'
  },
  purple: {
    primary: 'from-purple-500 to-pink-500',
    hover: 'hover:from-purple-600 hover:to-pink-600',
    solid: 'bg-purple-500',
    solidHover: 'hover:bg-purple-600',
    accent: 'text-purple-600',
    accentDark: 'text-purple-300',
    border: 'border-purple-500',
    headingLight: 'text-purple-950',
    headingDark: 'text-purple-50'
  },
  teal: {
    primary: 'from-teal-400 via-emerald-400 to-green-400',
    hover: 'hover:from-teal-500 hover:to-emerald-500',
    solid: 'bg-teal-400',
    solidHover: 'hover:bg-teal-500',
    accent: 'text-teal-600',
    accentDark: 'text-teal-300',
    border: 'border-teal-400',
    headingLight: 'text-teal-950',
    headingDark: 'text-teal-50'
  },
  amber: {
    primary: 'from-amber-500 to-orange-500',
    hover: 'hover:from-amber-600 hover:to-orange-600',
    solid: 'bg-amber-500',
    solidHover: 'hover:bg-amber-600',
    accent: 'text-amber-600',
    accentDark: 'text-amber-300',
    border: 'border-amber-500',
    headingLight: 'text-amber-950',
    headingDark: 'text-amber-50'
  }
}