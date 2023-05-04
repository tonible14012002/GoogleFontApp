import { Tooltip } from "react-tooltip"

import { useEffect, useState } from "react"
import Selector from "../Selector"
import { SIZE_CHOICES_VALUE, DEFAULT_SIZE_CHOICE } from "../../pages/utils/FontPreview"

const SizeModifier = ({setValue: setFontSize, resetSwitch}) => {

    const [ value, setValue ] = useState(SIZE_CHOICES_VALUE)

    const handleInputChange = (e) => {
        setValue(Number(e.target.value))
        setFontSize(Number(e.target.value))
    }

    const handleSelectorOnSelect = (value) => {
        setValue(value)
    }

    useEffect(() => {
        setFontSize(value)
    }, [value, setFontSize])

    useEffect(() => {
        setValue(DEFAULT_SIZE_CHOICE)
    }, [resetSwitch, setFontSize])

    return (
        <div className=" bg-slate-50 border flex items-center pl-2 pr-4 h-full w-full">
            <Selector
                data-tooltip-id="resize-tooltip"
                data-tooltip-content="Preivew Fontsize"
                className="overflow-y-auto max-h-[200px]"
                buttonClassName="laptop:w-[70px] w-[70px] min-w-0 text-xs"
                optionClassName="min-h-[40px]"
                items={SIZE_CHOICES_VALUE}
                displayItems={SIZE_CHOICES_VALUE}
                onSelect={handleSelectorOnSelect}
                currentValue={value}
                absoluteDisplay={value+ " px"}
            /> 
            <Tooltip id="resize-tooltip" />
            <div className="h-full px-2 laptop:px-4 flex items-center w-full">
                <input
                    className="w-full"
                    type="range"
                    value={value}
                    min={8}
                    max={300}
                    step={1}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default SizeModifier