import { useState, useEffect } from 'react'

interface UseWindowSize {
  width: number
  height: number
}

export default function useWindowSize(): UseWindowSize {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })

  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  useEffect(() => {
    function handleResize() {
      console.log(getSize())
      setWindowSize(getSize())
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
