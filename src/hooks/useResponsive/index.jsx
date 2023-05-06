import { useEffect } from 'react'
import { useState } from 'react'

const useResponsive = () => {
  const [screen, setScreen] = useState()
  useEffect(() => {
    if (window.innerWidth >= 1280) {
      setScreen('laptop')
      return
    }
    if (window.innerWidth >= 640) {
      setScreen('tablet')
      return
    }
    setScreen('mobile')
  })
  return { screen }
}

export default useResponsive
