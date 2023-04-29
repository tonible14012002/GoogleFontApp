import { memo } from "react"
import EButton from "../../../../../components/EButton"
import { addPlusSigns } from "../../../../../utils"

const FontCard = ({
    data,
    previewText,
    fontSize=14,
    style
}) => {

    const { category, family, files, menu, subsets, variants } = data

    return (
        <EButton className="border border-zinc-700 m-4 min-h-[300px] p-4 rounded-xl" style={style}
            to={`specimen/${addPlusSigns(family)}`}
        >
            <div className="flex justify-between">
                <span className="text-xl">{family}</span>
                <span className="text-zinc-400 text-sm font-medium">{variants.length} styles</span>
            </div>
            <p className="h-full mt-6 break-words" 
                style={{
                    fontSize,
                    fontFamily: family
                }}
            >
                {previewText}
            </p>
        </EButton>
    )
}

export default memo(FontCard)