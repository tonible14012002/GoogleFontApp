import { memo, useEffect, useState } from 'react'
import FontFaceObserver from 'fontfaceobserver'

import { addPlusSigns } from '../../../../../../googleApiUtils'
import EButton from '../../../../../../components/EButton'

const FontCard = ({ data, previewText, fontSize = 14, clearCellCache }) => {
  const { family, category, variants } = data
  const [fontLoaded, setFontLoaded] = useState(false)
  const handleLoadFont = () => {
    if (fontLoaded) {
      return
    }
    const checkFont = async () => {
      const font = new FontFaceObserver(family)
      try {
        await font.load()
        setFontLoaded(true)
        clearCellCache()
      } catch (e) {
        console.log(e)
      }
    }
    checkFont()
  }

  useEffect(handleLoadFont, [clearCellCache, family, fontLoaded])

  return (
    <EButton
      className="hover:bg-blue-50 block w-full h-full border-2 text-left
                p-4 hover:shadow-lg active:opacity-50 transition-all"
      to={`specimen/${addPlusSigns(family)}`}>
      <div className="flex justify-between">
        <h3 className="">{family}</h3>
        <span className="text-zinc-400 text-sm font-medium">{variants.length} styles</span>
      </div>
      <h3 className="text-sm opacity-60">{category}</h3>
      <p
        className={`h-full mt-6 break-words transition-opacity duration-300 ${
          !fontLoaded && 'opacity-0'
        }`}
        style={{
          fontSize,
          fontFamily: family
        }}>
        {previewText}
      </p>
    </EButton>
  )
}

export default memo(FontCard)
