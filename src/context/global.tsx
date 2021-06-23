import React, { createContext, useContext } from 'react'

import { useTheme } from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'

interface ToastProps {
  type: 'success' | 'error' | 'loading'
  message: string
  icon?: string
}

type GlobalContextData = {
  Toast(props: ToastProps): void
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)
export const GlobalProvider: React.FC = ({ children }) => {
  const theme = useTheme().colors

  const Toast = (props: ToastProps) => {
    const configs = (primary: string = theme.primary.normal) => ({
      icon: props.icon,
      style: {
        border: `1px solid ${primary}`,
        padding: '16px',
        color: primary
      },
      iconTheme: {
        primary: primary,
        secondary: theme.gray.background
      }
    })

    switch (props.type) {
      case 'success':
        toast.success(props.message, configs(theme.green))
        break
      case 'error':
        toast.error(props.message, configs(theme.red))
        break
      case 'loading':
        toast.loading(props.message, configs())
        break

      default:
        console.log('Type not supported')
        break
    }
  }

  return (
    <GlobalContext.Provider value={{ Toast }}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </GlobalContext.Provider>
  )
}

// Hook próprio
export function useGlobal(): GlobalContextData {
  const context = useContext(GlobalContext)

  return context
}
