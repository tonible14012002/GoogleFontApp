import { useParams } from "react-router-dom"
import { useFontContext } from "../../context/FontContext"
// import { useState } from "react"
import { Helmet } from "react-helmet"
import { useEffect, useMemo } from "react"
import EButton from "../../components/EButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

const FontDetail = () => {

    const  { familyName: plusAddedFamily } = useParams()
    const family = plusAddedFamily.replace(/\+/g, " ")
    const { fonts } = useFontContext()

    const fontDetail = useMemo(() => fonts.find(f => f.family === family), [fonts, family])
    console.log(fontDetail)

    const styleUrl = useMemo(() => {
        let url = `https://fonts.googleapis.com/css?family=${plusAddedFamily}`
        const variantParams = fontDetail.variants.join(',')
        if (variantParams) {
            url += ':' + variantParams
        }
        url += "&font-display:swap"
        return url
    }, [fontDetail, plusAddedFamily])

    useEffect(() => {
        const link = document.createElement('link')
        link.href = styleUrl
        link.rel = "stylesheet"

        document.head.appendChild(link)
    }, [styleUrl])

    return (
        <div className="mt-4">
            <div className="flex justify-between">
                <h3 className="text-3xl">{fontDetail.family}</h3>
                <EButton className="p-2 px-4 font-medium text-sm bg-amber-200 hover:bg-amber-300 active:opacity-70 transition-all text-zinc-800">
                    Download family
                </EButton>
            </div>
            <div className="mt-10">
                <h3 className="text-2xl">Styles</h3>
                <div className="flex mt-4 gap-4">
                    <div className="flex-1 bg-zinc-800">
                        <input className="w-full h-full bg-transparent outline-none px-6 py-4 focus:ring-4 ring-amber-200 ring-opacity-70 transition-all"/>
                    </div>
                    <div className="w-full max-w-[200px] laptop:max-w-[500px] bg-zinc-700">
                        slider
                    </div>
                </div>
            </div>

            <div className="mt-8">
                {fontDetail.variants.map(variant => (
                    <FontVariant
                        key={variant}
                        fontFamily={fontDetail.family}
                        variant={variant}
                        previewText={"joaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawdjoaijsdiaoiwjioawd"}
                        fontSize={40}
                    />
                ))}
            </div>

        </div>
    )
}

const FontVariant = ({
    previewText,
    fontFamily,
    variant,
    fontSize
}) => {

    const fontStyle = variant.includes('italic') ? 'italic': 'normal'
    const fontWeight = variant.replace('italic', '')

    return (
    <div className="py-4 w-full relative border-y border-zinc-600 text-zinc-300">
            <span className="text-sm font-medium text-zinc-500">{fontWeight} {fontStyle}</span>
            <h3 className="overflow-hidden mr-[200px]"
                style={{fontSize, fontFamily, fontStyle, fontWeight}}
            >
                {previewText}
            </h3>
            <EButton className="absolute right-0 top-1/2 -translate-y-1/2 font-medium text-zinc-500 hover:text-zinc-400 transition-all active:opacity-70">
                <span className="mr-2">
                    Select {fontWeight} {fontStyle}
                </span>
                <FontAwesomeIcon icon={faPlusCircle} />
            </EButton>
        </div>
    )
}

export default FontDetail