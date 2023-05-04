import { useParams } from "react-router-dom"
import { useFontContext } from "../../context/FontContext"
import { useLayoutEffect, useEffect, useMemo, useState } from "react"
import EButton from "../../components/EButton"
import ContentLayout from "../../components/ContentLayout"
import FontVariantPreview from "./components/FontVariantPreview"
import TextModifier from "../../components/TextModifier"
import SizeModifier from "../../components/SizeModifier"
import { DEFAULT_SENTENCE } from "../utils/FontPreview"
import ToggleSideBarButton from "../../components/ToggleSideBarButton"

const FontDetail = () => {

    const  { familyName: plusAddedFamily } = useParams()
    const family = plusAddedFamily.replace(/\+/g, " ")
    const { fonts } = useFontContext()

    const font = useMemo(() => fonts.find(f => f.family === family), [fonts, family])
    
    const styleUrl = useMemo(() => {
        let url = `https://fonts.googleapis.com/css?family=${plusAddedFamily}`
        const variantParams = font.variants.join(',')
        if (variantParams) {
            url += ':' + variantParams
        }
        url += "&font-display:swap"
        return url
    }, [font, plusAddedFamily])

    const [ fontSize, setFontSize ] = useState(0)
    const [ previewText, setPreviewText ] = useState(DEFAULT_SENTENCE)

    useLayoutEffect(() => {
        const link = document.createElement('link')
        link.href = styleUrl
        link.rel = "stylesheet"
        document.head.appendChild(link)
        return () => document.head.removeChild(link)
    }, [styleUrl])

    useEffect(() => {
        document.title = family
    }, [family])
    return (
        <>
        <div className="bg-slate-50 border h-[70px] sticky top-0 z-30">
            <ContentLayout className="h-full">
                <div className="px-4 flex justify-between items-center h-full">
                    <h3 className="text-xl laptop:text-3xl">{font.family}</h3>
                    <div className="flex items-center gap-2">
                        <EButton className="p-2 px-4 text-sm border-2 font-semibold border-blue-500 bg-slate-50 
                            hover:bg-slate-100 active:opacity-70 transition-all text-blue-500"
                            onClick={() => {alert("This feature will be done soon")}}
                        >
                            Download family
                        </EButton>
                        <ToggleSideBarButton className="w-[50px] h-[50px]"/>
                    </div>
                </div>
            </ContentLayout>
        </div>
        <ContentLayout className="mt-4">
            <div className="px-4">
                <div className="flex mt-4 gap-2 laptop:gap-4 h-[60px]">
                    <div className="flex-1 bg-slate-100 min-w-0">
                        <TextModifier
                            className="pl-4"
                            setPreviewText={setPreviewText}
                            disableModeChange
                            placeholder="Type here to preview text"
                        />
                    </div>
                    <div className="w-full max-w-[200px] laptop:max-w-[500px] bg-slate-100 min-w-[200px]">
                        <SizeModifier
                            setValue={setFontSize}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    {font.variants.map(variant => (
                        <FontVariantPreview
                            key={variant}
                            fontFamily={font.family}
                            variant={variant}
                            previewText={previewText}
                            fontSize={fontSize}
                            category={font.category}
                        />
                    ))}
                </div>
            </div>
        </ContentLayout>
        </>
    )
}


export default FontDetail