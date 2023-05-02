import { memo, useState } from "react"

import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip } from "react-tooltip"

import SearchBar from "./components/SearchBar"
import TextModifier from "./components/TextModifier"
import SizeModifier from "./components/SizeModifier"
import EButton from "../../../../components/EButton"
import ContentLayout from "../../../../components/ContentLayout"
import { useSearchParams } from "react-router-dom"

const ToolBar = ({
    setPreviewText,
    setFontSize,
}) => {

    const [ resetSwitch, setResetSwitch ] = useState(false)
    const [ ,setSearchParams] = useSearchParams()

    const handleResetPress= () => {
        setResetSwitch(prev => !prev)
        setSearchParams({})
    }

    return (
        <div className="w-full bg-white border-y h-[70px] sticky z-50 top-0 shadow-sm flex items-center px-4">
            <ContentLayout className="grid grid-cols-[1fr_1fr_1fr_50px] gap-4 h-[50px] w-full">
                <SearchBar
                    resetSwitch={resetSwitch}
                />
                <TextModifier
                    setPreviewText={setPreviewText}
                    resetSwitch={resetSwitch}
                />
                <SizeModifier
                    setValue={setFontSize}
                    resetSwitch={resetSwitch}
                />
                <div className="w-full">
                    <EButton
                        className="hover:bg-slate-100 w-[50px] h-[50px] rounded-full transition-all active:opacity-70 mx-auto"
                        data-tooltip-id="reset-tooltip"
                        data-tooltip-content="Reset"
                        onClick={handleResetPress}
                    >
                        <FontAwesomeIcon icon={faRotateLeft}/>
                    </EButton>
                    <Tooltip id="reset-tooltip"/>
                </div>
            </ContentLayout>
        </div>
    )
}

export default memo(ToolBar)
