import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EButton from '../EButton'
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons'
import { useFontCollection } from '../../context/FontCollectionContext/CollectionProvider'
import { Tooltip } from 'react-tooltip'

const ToggleSideBarButton = ({ className, ...props }) => {
  const { setShowCollection } = useFontCollection()

  const handleToggleFontCollection = () => {
    setShowCollection((prev) => !prev)
  }

  return (
    <EButton
      className={`text-blue-400 hover:bg-blue-50 rounded ${className}`}
      onClick={handleToggleFontCollection}
      data-tooltip-id="sidebar-tooltip"
      data-tooltip-content="Toggle Sidebar"
      {...props}
    >
      <FontAwesomeIcon icon={faBarsProgress} />
      <Tooltip id="sidebar-tooltip" className="z-50" />
    </EButton>
  )
}

export default ToggleSideBarButton
