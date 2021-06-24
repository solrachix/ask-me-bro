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
    const window = document.querySelector('#__next') as HTMLDivElement
    return {
      width: window.offsetWidth,
      height: window.offsetHeight
    }
  }

  useEffect(() => {
    const window = document.querySelector('#__next') as HTMLDivElement

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
