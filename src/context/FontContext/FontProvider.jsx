import { createContext, useContext, useEffect, useState } from 'react'
import * as FontServices from '../../services/fontServices'
import WelcomePage from '../../pages/WelcomePage'
import { googleStyleSheetUrlGenerator } from '../../googleApiUtils'

const FontContext = createContext()
const useFontContext = () => useContext(FontContext)

const BASE = 'https://fonts.googleapis.com/css?family='

const FontProvider = ({ children }) => {
  const [fonts, setFonts] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleGetFonts = () => {
    const fetchFonts = async () => {
      setLoading(true)
      const result = await FontServices.getFonts()
      if (result.status === 'ok') {
        const fontsData = result.data.items
        setFonts(fontsData)
        handleLoadFontStyle(googleStyleSheetUrlGenerator(fontsData))
      } else {
        setError(true)
      }
      setLoading(false)
    }
    fetchFonts()
  }

  const handleLoadFontStyle = (params) => {
    const links = params.map((param) => {
      const link = document.createElement('link')
      link.href = BASE + param
      link.rel = 'stylesheet'
      return link
    })

    links.forEach((link) => document.head.appendChild(link))
  }

  useEffect(handleGetFonts, [])

  return (
    <FontContext.Provider value={{ fonts, loading }}>
      {loading ? (
        <WelcomePage />
      ) : error ? (
        <div>There are some error when loading font from google api</div>
      ) : (
        children
      )}
    </FontContext.Provider>
  )
}

export default FontProvider
export { useFontContext }
