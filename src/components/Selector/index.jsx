import { useCallback, useEffect, useRef, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import useOnClickedOutSide from "../../hooks/useOnClickOutside"
import SelectorOption from "../SelectorOption"
import EButton from "../EButton"

const Selector = ({
    items,
    onSelect,
    isSelected,
    keyExtractor,
    valueExtractor,
    textExtractor,
    className,
    optionClassName,
    buttonClassName,
    defaultValue,
    currentValue,
    ...props
}) => {

    const [ showOptions, setShowOptions ] = useState(false)
    const [ value, setValue ] = useState(defaultValue)
    const wrapperRef = useRef()

    const handleClose = () => {
        setShowOptions(false)
    }

    const handleToggleSelector = () => {
        setShowOptions(prev => !prev)
    }

    const handleOptionsPress = (optionValue) => {
        setValue(optionValue)
        onSelect(optionValue)
    }

    const updateValueChange = () => {
        setValue(currentValue)
    }

    useEffect(updateValueChange, [currentValue])
    useOnClickedOutSide(wrapperRef, handleClose)

    return (
        <div className="relative"
            ref={wrapperRef}
        >
            <EButton className={`flex items-center justify-between p-2 text-sm min-w-[80px] hover:bg-slate-100 ${buttonClassName}`}
                onClick={handleToggleSelector}
            >
                <span>{value}</span>
                <FontAwesomeIcon className="text-xs" icon={faChevronDown}/>
            </EButton>
            {showOptions &&
            <ul className={`bg-white shadow-md min-w-[100px] flex flex-col absolute left-0 top-10 overflow-y-auto ${className}`}
                {...props}
            >
                {items.map((item, index) => {
                    let key = keyExtractor ? keyExtractor(item) : index
                    return (
                    <SelectorOption
                        className={optionClassName}
                        key={key}
                        value={valueExtractor(item, index)}
                        isSelected={ isSelected ? isSelected(item, index) : false}
                        onSelect={handleOptionsPress}
                    >
                        {textExtractor(item)}
                    </SelectorOption>
                )})}
            </ul>}
        </div>
    )
}

export default Selector