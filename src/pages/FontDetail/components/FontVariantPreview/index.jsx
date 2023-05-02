import EButton from "../../../../components/EButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

const FontVariantPreview = ({
    previewText,
    fontFamily,
    variant,
    fontSize
}) => {

    const fontStyle = variant.includes('italic') ? 'italic': 'normal'
    const fontWeight = variant.replace('italic', '')

    return (
        <div className="py-4 w-full relative text-zinc-800 first:border-t-2 border-b-2">
            <span className="text-sm font-medium text-zinc-500">{fontWeight} {fontStyle}</span>
            <h3 className="overflow-hidden mr-[200px]"
                style={{fontSize, fontFamily, fontStyle, fontWeight}}
            >
                {previewText}
            </h3>
            <EButton className="absolute right-0 top-1/2 -translate-y-1/2 font-medium text-blue-500 
                hover:bg-blue-100 hover:text-blue-700 py-1 px-2 rounded transition-all active:opacity-70"
            >
                <span className="mr-2">
                    Select {fontWeight} {fontStyle}
                </span>
                <FontAwesomeIcon icon={faPlusCircle} />
            </EButton>
        </div>
    )
}

export default FontVariantPreview