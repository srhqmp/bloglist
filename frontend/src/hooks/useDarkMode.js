import { useEffect, useState } from 'react'

export default function () {
  const [themeMode, setTheme] = useState('dark')
  const [mountedComponent, setMountedComponent] = useState(false)

  const setMode = (mode) => {
    try {
      window.localStorage.setItem('themeMode', mode)
    } catch {
      /* do nothing */
    }

    setTheme(mode)
  }

  const themeToggler = () => {
    themeMode === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem('themeMode')
      localTheme ? setTheme(localTheme) : setMode('light')
    } catch {
      setMode('light')
    }

    setMountedComponent(true)
  }, [])

  return [themeMode, themeToggler, mountedComponent]
}
