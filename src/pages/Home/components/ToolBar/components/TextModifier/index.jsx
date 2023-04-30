import { useCallback, useRef, useState, useEffect } from "react"
import { Tooltip } from "react-tooltip"
import { memo } from "react"

import EButton from "../../../../../../components/EButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import useOnClickOutside from "../../../../../../hooks/useOnClickOutside"
import SelectorOption from "../../../../../../components/SelectorOption"
import Selector from "../../../../../../components/Selector"



const PREVIEW_MODE=[
    'Custom',
    'Sentence',
    'Paragraph'
]

const DEFAULT_SENTENCE = "Whereas recognition of the inherent dignity"
const DEFAULT_PARAGRAPH = "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him. No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks."

const TextModifier = ({
    setPreviewText,

}) => {

    const [ mode, setMode ] = useState(PREVIEW_MODE[1])
    const [ isFocus, setIsFocus ] = useState(false)
    const [ value, setValue ] = useState("")

    const handleInputFocus = () => {
        setIsFocus(true)
    }
    const handleInputBlur = () => {
        setIsFocus(false)
    }

    const handleOptionSelect = (value) => {
        setMode(value)
    }

    const handleInputChange = (e) => {
        // set Sentence mode if input empty after delete
        if (value && !e.target.value) {
            setMode(PREVIEW_MODE[1])
        }
        else{
            setMode(PREVIEW_MODE[0])
        }
        setValue(e.target.value)
        setPreviewText(e.target.value)
    }

    const handlePreviewModeChange = () => {
        switch (mode) {
            case PREVIEW_MODE[0]:
                setPreviewText('')
                break
            case PREVIEW_MODE[1]:
                setValue('')
                setPreviewText(DEFAULT_SENTENCE)
                break
            case PREVIEW_MODE[2]: 
                setValue('')
                setPreviewText(DEFAULT_PARAGRAPH)
                break
        }
    }

    useEffect(handlePreviewModeChange, [mode, setPreviewText])

    console.log('render Text Modifier')
    return (
        <div className={`h-full flex items-center grow bg-slate-50 ${isFocus && "ring-4 bg-slate-100"} border`}>
            <Selector
                buttonClassName="w-[100px]"
                items={PREVIEW_MODE}
                keyExtractor={item => item}
                valueExtractor={item => item}
                onSelect={handleOptionSelect}
                textExtractor={item => item}
                isSelected={item => item === mode}
                currentValue={mode}
            />
            <input className="outline-none pr-4 h-full grow bg-transparent" 
                onChange={handleInputChange}
                value={value}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
        </div>
    )
}

export default memo(TextModifier)