import { useEffect, useState } from "react"
import Selector from "../../../../../../components/Selector"
import { SIZE_CHOICES_VALUE, DEFAULT_SIZE_CHOICE } from "../../../../../utils/FontPreview"

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
        <div className=" bg-slate-50 grow border flex items-center pl-2 pr-4 h-full">
            <Selector
                className="overflow-y-auto max-h-[200px]"
                optionClassName="min-h-[40px]"
                items={SIZE_CHOICES_VALUE}
                displayItems={SIZE_CHOICES_VALUE}
                onSelect={handleSelectorOnSelect}
                currentValue={value}
                absoluteDisplay={value+ " px"}
            />
            <div className="grow h-full px-4 flex items-center">
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