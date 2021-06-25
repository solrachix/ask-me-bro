import React, { createContext, useState, useContext } from 'react'

import { ThemeProvider as ThemeProviderComponent } from 'styled-components'

import * as themes from '@/styles/theme'

// type ArrayElement<
//   ArrayType extends readonly unknown[]
// > = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

// type changeThemeNames = ArrayElement<a>
type themesNames = ['Light', 'Dark']

interface ThemeContextData {
  theme: typeof themes.LightTheme
  changeTheme(name: string): void
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(themes.DarkTheme)

  const changeTheme = (name: themesNames) => {
    Object.keys(themes).map(
      theme => themes[theme].title === name && setTheme(themes[theme])
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <ThemeProviderComponent theme={theme}>{children}</ThemeProviderComponent>
    </ThemeContext.Provider>
  )
}

// Hook próprio
export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext)

  return context
}
