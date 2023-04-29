import { Helmet } from "react-helmet"
import { useFontContext } from "../../../../context/FontContext"
import { googleStyleSheetUrlGenerator } from "../../../../utils"
import FontCard from "./FontCard"
import { memo, useEffect, useMemo } from "react"

const MAX_URL_SIZE = 204

const FontList = ({
    fontSize,
    previewText,
}) => {
    const { fonts } = useFontContext()

    console.log('rerender List')
    return (
        <div>
            <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 ">
                {fonts?.slice(0,1000).map((fontData) => (
                    <FontCard
                        previewText={previewText}
                        fontSize={fontSize}
                        key={fontData.family}
                        data={fontData}
                    />
                ))}
            </ul>
        </div>
    )
}

export default memo(FontList)