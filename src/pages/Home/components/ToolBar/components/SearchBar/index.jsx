import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const SearchBar = () => {

    const [ isFocus, setIsFocus ] = useState(false)

    const handleFocus = () => {
        setIsFocus(true)
    }
    const handleBlur = () => {
        setIsFocus(false)
    }

    return (
        <div className={`${isFocus ? "bg-zinc-700": "bg-zinc-800 opacity-60"} transition-colors flex items-center relative`}>
            <span className="block absolute w-10 text-zinc-400">
                <FontAwesomeIcon className="block mx-auto" icon={faSearch}/>
            </span>
            <input className="outline-none bg-transparent transition-all h-full w-full pl-10 pr-4"
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    )
}

export default SearchBar