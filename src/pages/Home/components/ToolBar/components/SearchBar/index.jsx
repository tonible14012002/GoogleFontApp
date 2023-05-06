import { memo, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { getQueryFromParam } from '../../../../../../settings/FontFilterSetting/utils'

const SearchBar = ({ resetSwitch }) => {
  const [isFocus, setIsFocus] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [query] = getQueryFromParam(searchParams)
  const [value, setValue] = useState(query.replace('+', ' '))
  const isTouched = useRef(false)

  const handleInputChange = (e) => {
    setValue(e.target.value)
    isTouched.current = true
  }

  const handleFocus = () => {
    setIsFocus(true)
  }
  const handleBlur = () => {
    setIsFocus(false)
  }

  useEffect(() => {
    // reset available only when search touched
    if (!isTouched.current) return
    setValue('')
  }, [resetSwitch])

  useEffect(() => {
    const timerId = setTimeout(() => {
      value
        ? searchParams.set('query', value.replace(' ', '+').toLowerCase())
        : searchParams.delete('query')
      setSearchParams(searchParams)
    }, 300)
    return () => clearTimeout(timerId)
  }, [value, searchParams, setSearchParams])

  return (
    <div
      className={`${
        isFocus && 'ring-4 bg-slate-100'
      } border bg-slate-50 transition-all flex items-center relative h-[50px] flex-1`}>
      <span className="block absolute w-10 text-zinc-400">
        <FontAwesomeIcon className="block mx-auto" icon={faSearch} />
      </span>
      <input
        className="outline-none bg-transparent transition-all h-full w-full pl-10 pr-4"
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  )
}

export default memo(SearchBar)
