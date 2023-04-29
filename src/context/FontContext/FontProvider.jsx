import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as FontServices from "../../services/fontServices";
import { Helmet } from "react-helmet";
import { googleStyleSheetUrlGenerator } from "../../utils"


const FontContext = createContext()
const useFontContext = () => useContext(FontContext)

const BASE = "https://fonts.googleapis.com/css?family="
const FontProvider = ({children}) => {

    const [ fonts, setFonts ] = useState()
    const [ loading, setLoading ] = useState(true)

    const params =  useMemo(() => googleStyleSheetUrlGenerator(fonts || []), [fonts])

    const handleGetFonts = () => {
        const fetchFonts = async () => {
            setLoading(true)
            const data = await FontServices.getFonts()
            setFonts(data.items)
            setLoading(false)
        }
        fetchFonts()
    }

    const handleLoadFontStyle = () => {
        const links = params.map(param => {
            const link =document.createElement('link')
            link.href=BASE + param
            link.rel="stylesheet"
            return link
        })

        links.forEach(link => document.head.appendChild(link))
    }

    useEffect(handleLoadFontStyle, [params])
    useEffect(handleGetFonts, [])

    return (
        <FontContext.Provider
            value={{fonts, loading}}
        >
            {loading ?
            <div className="w-full h-[100vh] overflow-hidden bg-zinc-900">Loading</div>:
            children}
        </FontContext.Provider>
    )
}

export default FontProvider
export { useFontContext }