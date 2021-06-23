import React from 'react'
import { ThemeProvider } from 'styled-components'

import { RouterContextProvider } from '@/hooks/useRouter'

import { GlobalProvider } from './global'

import GlobalStyle from '@/styles/GlobalStyle'
import { LightTheme } from '@/styles/theme'
import { AuthContextProvider } from './auth'

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <RouterContextProvider>
        <AuthContextProvider>
          <GlobalProvider>{children}</GlobalProvider>
        </AuthContextProvider>
      </RouterContextProvider>
    </ThemeProvider>
  )
}

export default AppProvider
