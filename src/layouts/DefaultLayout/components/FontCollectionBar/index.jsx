import ReactDOM from 'react-dom'
import EButton from '../../../../components/EButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useFontCollection } from '../../../../context/FontCollectionContext/CollectionProvider'
import InstructionDrawer from './components/InstructionDrawer'
import ReviewDrawer from './components/ReviewDrawer'

const FontCollectionBar = () => {
  const { collection, showCollection, setShowCollection } = useFontCollection()

  const handleClosePress = () => {
    setShowCollection(false)
  }

  return ReactDOM.createPortal(
    <div
      className={`fixed flex flex-col top-0 right-0 bottom-0 bg-white shadow-lg w-[340px] z-50 transition-transform ${
        !showCollection && 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 min-h-[70px] border-b">
        <h3 className="">Selected family</h3>
        <EButton className="" onClick={handleClosePress}>
          <FontAwesomeIcon icon={faClose} />
        </EButton>
      </div>

      {Object.keys(collection).length ? (
        <>
          <ReviewDrawer />
          <InstructionDrawer />

          <section className="p-2 border-t">
            <EButton className="w-full text-center bg-blue-500 text-white p-3 flex items-center gap-2 justify-center hover:bg-blue-600 transition-colors">
              <FontAwesomeIcon icon={faDownload} />
              <span>Download all</span>
            </EButton>
          </section>
        </>
      ) : (
        <div className="h-full flex items-center justify-center">Nothing have been selected.</div>
      )}
    </div>,
    document.querySelector('body')
  )
}

export default FontCollectionBar
