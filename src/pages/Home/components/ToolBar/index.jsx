import { memo, useState } from 'react'

import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'react-tooltip'

import SearchBar from './components/SearchBar'
import TextModifier from '../../../../components/TextModifier'
import SizeModifier from '../../../../components/SizeModifier'
import EButton from '../../../../components/EButton'
import ContentLayout from '../../../../components/ContentLayout'
import { useSearchParams } from 'react-router-dom'
import ToggleSideBarButton from '../../../../components/ToggleSideBarButton'

const ToolBar = ({ setPreviewText, setFontSize }) => {
  const [resetSwitch, setResetSwitch] = useState(false)
  const [, setSearchParams] = useSearchParams()

  const handleResetPress = () => {
    setResetSwitch((prev) => !prev)
    setSearchParams({})
  }

  return (
    <div className="w-full min-h-[70px] bg-white border-y sticky z-30 top-0 shadow-sm flex items-center">
      <ContentLayout>
        <div className="flex flex-col laptop:grid laptop:grid-cols-[1fr_2fr] laptop:gap-4 h-fit w-full px-4">
          <div className="h-[70px] laptop:h-fit flex items-center gap-2">
            <SearchBar className="" resetSwitch={resetSwitch} />
            <EButton
              className="block laptop:hidden hover:bg-slate-100 w-[50px] h-[50px] rounded-full transition-all active:opacity-70 mx-auto"
              data-tooltip-id="reset-tooltip"
              data-tooltip-content="Reset"
              onClick={handleResetPress}
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              <Tooltip id="reset-tooltip" />
            </EButton>
            <ToggleSideBarButton className="w-[50px] h-[50px] laptop:hidden" />
          </div>
          <div className="flex  items-start laptop:grid-cols-[1fr_1fr_50px_40px] gap-2 laptop:gap-4 h-[60px] laptop:h-[50px]">
            <div className="h-[50px] min-w-0 flex-1">
              <TextModifier setPreviewText={setPreviewText} resetSwitch={resetSwitch} />
            </div>
            <div className="h-[50px] flex-1 min-w-[200px]">
              <SizeModifier setValue={setFontSize} resetSwitch={resetSwitch} />
            </div>
            <div className="hidden w-[50px] laptop:block">
              <EButton
                className="laptop:block hover:bg-slate-100 w-[50px] h-[50px] rounded-full transition-all active:opacity-70 mx-auto"
                data-tooltip-id="reset-tooltip"
                data-tooltip-content="Reset"
                onClick={handleResetPress}
              >
                <FontAwesomeIcon icon={faRotateLeft} />
                <Tooltip id="reset-tooltip" />
              </EButton>
            </div>
            <ToggleSideBarButton className="w-[50px] h-[50px] hidden laptop:block" />
          </div>
        </div>
      </ContentLayout>
    </div>
  )
}

export default memo(ToolBar)
