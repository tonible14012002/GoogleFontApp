import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import EButton from '../../../../../../../../components/EButton'
import { useFontCollection } from '../../../../../../../../context/FontCollectionContext/CollectionProvider'
import { variantToStyleName, extractVariantInfo } from '../../../../../../../../googleApiUtils'
import { memo } from 'react'

const ReviewItem = ({ family, variant }) => {
  const { dispatcher } = useFontCollection()
  const { fontStyleName, fontWeightName } = variantToStyleName(variant)
  const { fontWeight } = extractVariantInfo(variant)

  const handleToggleVariant = () => {
    dispatcher({
      type: 'toggle',
      data: {
        family,
        variant
      }
    })
  }

  return (
    <div className="flex items-center justify-between w-full py-2 text-sm h-[40px]">
      <span>
        {fontWeightName} {fontWeight} {fontStyleName}
      </span>
      <EButton
        className="hover:bg-blue-100 w-8 h-8 rounded-full transition-colors"
        onClick={handleToggleVariant}>
        <FontAwesomeIcon icon={faMinus} />
      </EButton>
    </div>
  )
}

export default memo(ReviewItem)
