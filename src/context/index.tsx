import React from 'react'

import { ThemeProvider } from 'styled-components'

import { RouterContextProvider } from '@/hooks/useRouter'

import { GlobalProvider } from './global'

import GlobalStyle from '@/styles/GlobalStyle'
import { DarkTheme } from '@/styles/theme'

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <GlobalStyle />
      <RouterContextProvider>
        <GlobalProvider>{children}</GlobalProvider>
      </RouterContextProvider>
    </ThemeProvider>
  )
}

export default AppProvider
