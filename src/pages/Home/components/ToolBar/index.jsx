import { useState } from "react"

import { faGlassCheers, faRotateLeft, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import FilterBar from "../FilterBar"
import SearchBar from "./components/SearchBar"
import TextModifier from "./components/TextModifier"
import SizeModifier from "./components/SizeModifier"
import EButton from "../../../../components/EButton"
import { Tooltip } from "react-tooltip"

const DEFAULT_FONT_SIZE = 40

const ToolBar = ({
    setPreviewText,
    setFontSize
}) => {

    console.log('rerender Toolbar')

    return (
        <div className="w-full grid grid-cols-[2fr_3fr_2fr_100px] h-[80px] my-4 gap-4 sticky backdrop-blur-md top-0 p-4">
            <SearchBar />
            <TextModifier
                setPreviewText={setPreviewText}
            />
            <SizeModifier/>
            <div className="w-full">
                <EButton
                    className="hover:bg-zinc-800 w-[50px] h-[50px] rounded-full transition-all active:opacity-70 mx-auto"
                    data-tooltip-id="reset-tooltip"
                    data-tooltip-content="Reset"
                    onClick={() => {}}
                >
                    <FontAwesomeIcon icon={faRotateLeft}/>
                </EButton>
                <Tooltip id="reset-tooltip"/>
            </div>
        </div>
    )
}

export default ToolBar
