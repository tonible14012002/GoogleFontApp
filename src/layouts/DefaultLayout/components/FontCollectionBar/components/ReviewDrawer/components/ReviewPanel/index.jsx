import EButton from '../../../../../../../../components/EButton'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReviewItem from '../ReviewItem'
import { memo, useState } from 'react'
import { useFontCollection } from '../../../../../../../../context/FontCollectionContext/CollectionProvider'

const ReviewPanel = ({ family }) => {
  const { collection } = useFontCollection()
  const [showItems, setShowItems] = useState(false)

  const handleToggleShowItems = () => {
    setShowItems((prev) => !prev)
  }

  return (
    <div className="border">
      <EButton
        className="flex items-center justify-between w-full p-4 hover:bg-slate-50"
        onClick={handleToggleShowItems}
      >
        <h3 className="text-blue-600">{family}</h3>
        <span className="text-sm">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </EButton>
      <ul
        className="px-4 text-zinc-600 overflow-hidden transition-all"
        style={{
          height: showItems ? collection[family]['variants'].length * 40 : 0
        }}
      >
        {collection[family]['variants'].map((variant) => (
          <ReviewItem key={variant} family={family} variant={variant} />
        ))}
      </ul>
    </div>
  )
}

export default memo(ReviewPanel)
