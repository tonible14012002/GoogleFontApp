import { memo, useEffect, useMemo, useState } from "react"

import EButton from "../../../../components/EButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { useFontCollection } from "../../../../context/FontCollectionContext/CollectionProvider"
import { extractVariantInfo, variantToStyleName } from "../../../../utils"

const FontVariantPreview = ({
    previewText,
    fontFamily,
    variant,
    category,
    fontSize
}) => {

    const { collection, dispatcher } = useFontCollection()
    const {fontStyle, fontWeight} = useMemo(() => extractVariantInfo(variant), [variant])
    const { fontStyleName, fontWeightName } = useMemo(() => variantToStyleName(variant), [variant])
    const [ isSelected, setIsSelected ] = useState(false)

    const handleVariantPress = () => {
        dispatcher({type: "toggle", data : {
            family: fontFamily,
            variant,
            category
        }})
    }
    useEffect(() => {
        setIsSelected(
            fontFamily in collection && collection[fontFamily]["variants"].includes(variant)
        )
    }, [collection, fontFamily, variant])

    return (
        <div className="py-12 w-full relative text-zinc-800 first:border-t-2 border-b-2">
            <span className=" absolute left-0 top-4 text-sm font-medium text-zinc-500">{fontWeightName} {fontWeight} {fontStyleName}</span>
            <h3 className="overflow-hidden mr-[100px] laptop:mr-[200px]  whitespace-nowrap"
                style={{fontSize, fontFamily, fontStyle, fontWeight}}
            >
                {previewText}
            </h3>
            <EButton className={`absolute right-0 top-1/2 -translate-y-1/2 font-medium 
                ${isSelected ? "text-zinc-500" : "text-blue-500"} 
                hover:bg-blue-100 hover:text-blue-700 py-1 px-2 rounded transition-all active:opacity-70`}
                onClick={handleVariantPress}
            >
                {isSelected ? 
                <span className="mr-2">
                    <span>Remove</span>
                    <span className="hidden laptop:inline-block">&nbsp;{fontWeightName}</span>
                    <span className="hidden laptop:inline-block">&nbsp;{fontWeight}</span>
                    <span className="hidden laptop:inline-block">&nbsp;{fontStyleName}</span>
                </span> :
                <span className="mr-2">
                    <span>Select</span> 
                    <span className="hidden laptop:inline-block">&nbsp;{fontWeightName}</span>
                    <span className="hidden laptop:inline-block">&nbsp;{fontWeight}</span>&nbsp;
                    <span className="hidden laptop:inline-block">&nbsp;{fontStyleName}</span>
                </span>}
                <FontAwesomeIcon icon={isSelected ? faMinusCircle : faPlusCircle} />
            </EButton>
        </div>
    )
}

export default memo(FontVariantPreview)