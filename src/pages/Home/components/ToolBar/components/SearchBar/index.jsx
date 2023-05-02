import { useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { getQueryFromParam } from "../../../../utils/Query"
import { useSearchParams } from "react-router-dom"
import useDebounce from "../../../../../../hooks/useDebounce"

const SearchBar = ({resetSwitch}) => {

    const [ isFocus, setIsFocus ] = useState(false)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ query ] = getQueryFromParam(searchParams)
    const [ value, setValue ] = useState(query.replace("+", " "))
    const debouncedValue = useDebounce(value, 300)

    const handleInputChange = (e) => {
        setValue(e.target.value)
    } 

    const handleFocus = () => {
        setIsFocus(true)
    }
    const handleBlur = () => {
        setIsFocus(false)
    }

    useEffect(()=>{
        setValue("")
    }, [resetSwitch])

    useEffect(() => {
        if (query !== debouncedValue) {
            debouncedValue ?
            searchParams.set("query", debouncedValue.replace(" ", "+").toLowerCase()) :
            searchParams.delete("query")

            setSearchParams(searchParams)
        }
    }, [debouncedValue, searchParams, setSearchParams, query])

    return (
        <div className={`${isFocus&&"ring-4 bg-slate-100"} border bg-slate-50 transition-all flex items-center relative`}>
            <span className="block absolute w-10 text-zinc-400">
                <FontAwesomeIcon className="block mx-auto" icon={faSearch}/>
            </span>
            <input className="outline-none bg-transparent transition-all h-full w-full pl-10 pr-4"
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    )
}

export default SearchBar