import { createContext, useContext, useEffect, useState } from 'react'
import * as FontServices from '../../services/fontServices'
import WelcomePage from '../../pages/WelcomePage'
import { getFontStyleSheetUrls } from '../../googleApiUtils'

const FontContext = createContext()
const useFontContext = () => useContext(FontContext)

const FontProvider = ({ children }) => {
  const [fonts, setFonts] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoadFontStyle = (urls) => {
    const links = urls.map((url) => {
      const link = document.createElement('link')
      link.href = url
      link.rel = 'stylesheet'
      return link
    })

    links.forEach((link) => document.head.appendChild(link))
  }

  const handleGetFonts = () => {
    const fetchFonts = async () => {
      setLoading(true)
      const result = await FontServices.getFonts()
      if (result.status === 'ok') {
        const fontsData = result.data.items
        setFonts(fontsData)
        handleLoadFontStyle(getFontStyleSheetUrls(fontsData))
      } else {
        setError(true)
      }
      setLoading(false)
    }
    fetchFonts()
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
