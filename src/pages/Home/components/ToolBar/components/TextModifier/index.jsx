import { useCallback, useReducer, useRef, useState } from "react"
import EButton from "../../../../../../components/EButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import useOnClickOutside from "../../../../../../hooks/useOnClickOutside"
import { Tooltip } from "react-tooltip"
import { memo } from "react"
import { useEffect } from "react"

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

    const [ modeId, setModeId ] = useState(1)
    const [ showSelector, setShowSelector ] = useState(false)
    const [ value, setValue ] = useState("")

    const wrapperRef = useRef()

    const handleOptionPress = useCallback((id) => {
        setModeId(id)
    }, [])

    const handleToggleSelector = () => {
        setShowSelector(prev => !prev)
    }

    const handleHideSelector = () => {
        setShowSelector(false)
    }

    const handleInputChange = (e) => {
        setModeId(0)
        setValue(e.target.value)
        setPreviewText(e.target.value)
    }

    console.log('text modifier rerender')

    const handlePreviewModeChange = () => {
        setValue('')
        switch (modeId) {
            case 0:
                setPreviewText('')
                break
            case 1:
                setPreviewText(DEFAULT_SENTENCE)
                break
            case 2: 
                setPreviewText(DEFAULT_PARAGRAPH)
                break

        }
    }

    useOnClickOutside(wrapperRef, handleHideSelector)
    useEffect(handlePreviewModeChange, [modeId, setPreviewText])

    return (
        <div className="h-full flex items-center ml-2 grow">
            <div className="relative h-10 mr-1 min-w-[100px]"
                ref={wrapperRef}
            >
                <EButton
                    data-tooltip-id="preview-tooltip"
                    data-tooltip-content="Update preview select"
                    className="px-2 bg-zinc-800 hover:opacity-80 transition-opacity h-full text-left flex min-w-[120px] justify-between items-center"
                    onClick={handleToggleSelector}
                >
                    <span>{PREVIEW_MODE[modeId]}</span>
                    <span className="text-xs">
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </span>
                </EButton>

                {!showSelector &&
                <Tooltip id="preview-tooltip" />}

                {showSelector && 
                <ul className="absolute top-14 w-[140px] flex flex-col bg-zinc-800">
                    {PREVIEW_MODE.map((mode, index) => (
                        <PreviewOption
                            isSelected={modeId === index}
                            onSelect={handleOptionPress}
                            id={index}
                        >
                            {mode}
                        </PreviewOption>
                    ))}
                </ul>}
            </div>
            <input className="outline-none px-4 h-full bg-zinc-800 grow" 
                onChange={handleInputChange}
                value={value}
            />
        </div>
    )
}

export default memo(TextModifier)

const PreviewOption = ({onSelect, id, isSelected, children}) => {
    const handleButtonPress = () => {
        onSelect(id)
    }

    return (
        <EButton className={`px-4 py-2 text-left hover:bg-zinc-700 transition-all active:opacity-70 ${isSelected && "bg-zinc-600"}`}
            onClick={handleButtonPress}
        >
            {children}
        </EButton>
    )
}