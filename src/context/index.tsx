import React from 'react'

import { RouterContextProvider } from '@/hooks/useRouter'

import { GlobalProvider } from './global'
import { AuthContextProvider } from './auth'
import { ThemeProvider } from './theme'

import GlobalStyle from '@/styles/GlobalStyle'

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
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
