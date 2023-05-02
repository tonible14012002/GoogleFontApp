import { useState, useEffect } from "react"
import { memo } from "react"
import Selector from "../../../../../../components/Selector"
import { PREVIEW_MODE, DEFAULT_PARAGRAPH, DEFAULT_SENTENCE } from "../../../../../utils/FontPreview"

const TextModifier = ({
    setPreviewText,
    resetSwitch,
    disableModeChange=false,
    className,
    ...props
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
        setValue('')
        switch (value) {
            case PREVIEW_MODE[0]:
                setPreviewText('')
                break
            case PREVIEW_MODE[1]:
                setPreviewText(DEFAULT_SENTENCE)
                break
            case PREVIEW_MODE[2]: 
                if (disableModeChange) return
                setValue('')
                setPreviewText(DEFAULT_PARAGRAPH)
                break
        }
    }

    const handleInputChange = (e) => {
        // set Sentence mode if input empty after delete
        if (value && !e.target.value) {
            setMode(PREVIEW_MODE[1])
            setPreviewText(DEFAULT_SENTENCE)
        }
        else{
            setMode(PREVIEW_MODE[0])
            setPreviewText(e.target.value)
        }
        setValue(e.target.value)
    }

    useEffect(() => {
        setMode(PREVIEW_MODE[1])
        setPreviewText(DEFAULT_SENTENCE)
        setValue("")
    }, [resetSwitch, setPreviewText])

    return (
        <div className={`h-full flex items-center grow bg-slate-50 ${isFocus && "ring-4 bg-slate-100"} border`}>
            {!disableModeChange &&
            <Selector
                buttonClassName="w-[100px]"
                items={PREVIEW_MODE}
                displayItems={PREVIEW_MODE}
                onSelect={handleOptionSelect}
                currentValue={mode}
            />}
            <input className={`outline-none pr-4 h-full grow bg-transparent ${className}`}
                onChange={handleInputChange}
                value={value}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...props}
            />
        </div>
    )
}

export default memo(TextModifier)