import { Router } from 'next/router'
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'


interface GlobalContextData {
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

export const GlobalProvider: React.FC = ({ children }) => {
 

  return (
    <GlobalContext.Provider value={{  }}>
      {children}
    </GlobalContext.Provider>
  )
}

// Hook próprio
export function useGlobal(): GlobalContextData {
  const context = useContext(GlobalContext)

  return context
}
