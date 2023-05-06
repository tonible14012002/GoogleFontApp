import { memo } from 'react'

import { useFontCollection } from '../../../../../../context/FontCollectionContext/CollectionProvider'
import ReviewPanel from './components/ReviewPanel'

const ReviewDrawer = () => {
  const { collection } = useFontCollection()

  return (
    <section className="max-h-[400px] p-4 overflow-y-auto">
      <h3 className="text-sm pb-4 font-medium">Review</h3>
      <ul className="flex flex-col gap-4">
        {Object.keys(collection).map((family) => {
          return <ReviewPanel key={family} family={family} />
        })}
      </ul>
    </section>
  )
}

export default memo(ReviewDrawer)
