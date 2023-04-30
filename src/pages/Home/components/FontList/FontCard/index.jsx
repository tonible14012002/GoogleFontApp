import { memo, useEffect } from "react"
import EButton from "../../../../../components/EButton"
import { addPlusSigns } from "../../../../../utils"

const FontCard = ({
    data,
    previewText,
    fontSize=14,
}) => {

    const { family, category, variants } = data

    return (
        <EButton className="hover:bg-slate-50 block w-full h-full border-2 text-left p-4 hover:shadow-lg active:opacity-50 transition-all"
            to={`specimen/${addPlusSigns(family)}`}
        >
            <div className="flex justify-between">
                <h3 className="">{family}</h3>
                <span className="text-zinc-400 text-sm font-medium">{variants.length} styles</span>
            </div>
            <h3 className="text-sm opacity-60">{category}</h3>
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