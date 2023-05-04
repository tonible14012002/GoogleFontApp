import { useEffect, useRef, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import useOnClickedOutSide from "../../hooks/useOnClickOutside"
import SelectorOption from "../SelectorOption"
import EButton from "../EButton"

const Selector = ({
    items=[],
    displayItems=[],
    onSelect,
    className,
    optionClassName,
    buttonClassName,
    currentValue,
    absoluteDisplay,
    ...props
}) => {

    const [ showOptions, setShowOptions ] = useState(false)
    const [ id, setId ] = useState(0)
    const wrapperRef = useRef()

    const handleClose = () => {
        setShowOptions(false)
    }

    const handleToggleSelector = () => {
        setShowOptions(prev => !prev)
    }

    const handleOptionsPress = (optionValue, index) => {
        setId(index)
        onSelect(optionValue)
        setShowOptions(false)
    }

    const updateValueChange = () => {
        const index = items.indexOf(currentValue)
        setId(index)
    }

    useEffect(updateValueChange, [currentValue, items])
    useOnClickedOutSide(wrapperRef, handleClose)

    return (
        <div className="relative w-fit"
            ref={wrapperRef}
            {...props}
        >
            <EButton className={`flex items-center justify-between p-2 text-sm min-w-[80px] hover:bg-slate-100 ${buttonClassName}`}
                onClick={handleToggleSelector}
            >
                <span>{absoluteDisplay || (id > -1 ? displayItems[id] : "")}</span>
                <FontAwesomeIcon className="text-xs" icon={faChevronDown}/>
            </EButton>
            {showOptions &&
            <ul className={`bg-white shadow-md min-w-[100px] flex flex-col absolute left-0 top-10 overflow-y-auto z-20 ${className}`}>
                {items.map((item, index) => {
                    return (
                    <SelectorOption
                        className={optionClassName}
                        key={index}
                        index={index}
                        value={item}
                        isSelected={id === index}
                        onSelect={handleOptionsPress}
                    >
                        {displayItems[index]}
                    </SelectorOption>
                )})}
            </ul>}
        </div>
    )
}

export default Selector