export type ThemeColors = {
  primary: string
  hover: string
  solid: string
  solidHover: string
  accent: string
  accentDark: string
  border: string
  headingLight: string
  headingDark: string
  switchBorderLight: string
  switchBorderDark: string
  }
  
  export type Themes = {
    blue: ThemeColors
    purple: ThemeColors
    teal: ThemeColors
    amber: ThemeColors
  }
  
  export type ThemeKey = keyof Themes
  
  export type Preferences = {
    gradients: boolean
    reduceTransparency: boolean
    roundedCorners: boolean
    increaseContrast: boolean
    toggleLabels: boolean
  }
// lib/types.ts
