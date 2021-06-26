import React, { createContext, useContext, useState } from 'react'

import { useTheme } from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'

import Header from './../components/Header/index'
import Layout from '@/components/Layout'

interface ToastProps {
  type: 'success' | 'error' | 'loading'
  message: string
  icon?: string
}

interface MenuProps {
  title: string
  onClick(): void
}

type GlobalContextData = {
  Toast(props: ToastProps): void
  header: {
    activated: boolean
    set(prop: boolean, menu?: MenuProps[]): void
  }
  setRoomCode: React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)
export const GlobalProvider: React.FC = ({ children }) => {
  const theme = useTheme().colors
  const [enableHeader, setEnableHeader] = useState(false)
  const [menuHeader, setMenuHeader] = useState([])
  const [roomCode, setRoomCode] = useState('')

  const header = {
    activated: enableHeader,
    set: (prop: boolean, menu?: MenuProps[]) => {
      setEnableHeader(prop)
      setMenuHeader(menu)
    }
  }

  const Toast = (props: ToastProps) => {
    const configs = (primary: string = theme.primary.normal) => ({
      icon: props.icon,
      style: {
        background: theme.gray.background,
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
    <GlobalContext.Provider value={{ Toast, header, setRoomCode }}>
      <Toaster position="top-right" reverseOrder={false} />
      <Layout>
        {enableHeader && <Header roomCode={roomCode} menuHeader={menuHeader} />}
        {children}
      </Layout>
    </GlobalContext.Provider>
  )
}

// Hook próprio
export function useGlobal(): GlobalContextData {
  const context = useContext(GlobalContext)

  return context
}
