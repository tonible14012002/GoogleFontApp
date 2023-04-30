import { memo } from "react"

import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip } from "react-tooltip"

import SearchBar from "./components/SearchBar"
import TextModifier from "./components/TextModifier"
import SizeModifier from "./components/SizeModifier"
import EButton from "../../../../components/EButton"
import ContentLayout from "../../../../components/ContentLayout"

const ToolBar = ({
    setPreviewText,
    setFontSize,
}) => {

    console.log('rerender Toolbar')

    return (
        <div className="w-full bg-white border-y h-[80px] gap-4 sticky z-50 top-0 py-4">
            <ContentLayout className=" grid grid-cols-[1fr_1fr_1fr_50px] gap-4">

                <SearchBar />
                <TextModifier
                    setPreviewText={setPreviewText}
                />
                <SizeModifier
                    // value={fontSize}
                    setValue={setFontSize}
                />
                <div className="w-full">
                    <EButton
                        className="hover:bg-slate-100 w-[50px] h-[50px] rounded-full transition-all active:opacity-70 mx-auto"
                        data-tooltip-id="reset-tooltip"
                        data-tooltip-content="Reset"
                        onClick={() => {}}
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
