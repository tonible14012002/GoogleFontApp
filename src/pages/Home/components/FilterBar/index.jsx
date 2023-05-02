import { memo, useEffect, useRef, useState } from "react"
import ContentLayout from "../../../../components/ContentLayout"
import Selector from "../../../../components/Selector"
import { useSearchParams } from "react-router-dom"
import { 
    getFilterLanguageFromParam,
    LANGUAGE_CHOICES,
    DEFAULT_LANGUAGE_FILTER_VALUE,
    LANGUAGE_CHOICE_VALUES
} from "../../utils/Languages"
import EButton from "../../../../components/EButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import SelectorOption from "../../../../components/SelectorOption"
import useOnClickedOutSide from "../../../../hooks/useOnClickOutside"
import { CATEGORY_CHOICES, CATEGORY_CHOICES_VALUES, getCategoriesFromParam } from "../../utils/Category"

const FilterBar = () => {

    const [ searchParams, setSearchParams ] = useSearchParams()
    const [language, isLanguageParamValid] = getFilterLanguageFromParam(searchParams)

    const [categories, isCategoryParamValid ] = getCategoriesFromParam(searchParams)
    const categoriesString = categories.join(",")

    const handleSelectCategory = (updateCategory) => {
        const newCategories = updateCategory(categories)

        !newCategories.length ? 
        searchParams.delete("category") :
        searchParams.set("category", newCategories)
        console.log(newCategories)

        setSearchParams(searchParams)
    }

    const handleSelectLanguage = (value) => {

        value === DEFAULT_LANGUAGE_FILTER_VALUE ?
        searchParams.delete("subset"):
        searchParams.set("subset", value)
        
        setSearchParams(searchParams)
    }

    useEffect((() => {
        if (!isLanguageParamValid) {
            searchParams.set("language", language)
            setSearchParams(searchParams)
        }
    }), [isLanguageParamValid, setSearchParams, searchParams, language])

    useEffect(() => {
        if (!isCategoryParamValid) {
            searchParams.set("category", categoriesString)
            setSearchParams(searchParams)
        }
    }, [isCategoryParamValid, setSearchParams , searchParams, categoriesString])

    console.log('rerender Filter bar')
    return (
        <ContentLayout className="my-4 mx-4 flex gap-4">
            <Selector
                className="max-h-[100vh] h-[300px] overflow-y-auto min-w-[200px]"
                buttonClassName="min-w-[110px] border gap-2"
                optionClassName="min-h-[50px]"
                items={LANGUAGE_CHOICE_VALUES}
                displayItems={LANGUAGE_CHOICES}
                onSelect={handleSelectLanguage}
                currentValue={language}
            />
            <MultipleSelector
                className="min-w-[400px]"
                buttonClassName="min-w-[400px]"
                items={CATEGORY_CHOICES_VALUES}
                displayItems={CATEGORY_CHOICES}
                onSelect={handleSelectCategory}
                currentValues={categories}
                noSelectedPromp="Category"
            />

        </ContentLayout>
    )
}

export default memo(FilterBar)

const MultipleSelector = ({
    items=[],
    displayItems=[],
    onSelect,
    className,
    optionClassName,
    buttonClassName,
    noSelectedPromp="Not thing selected",
    allSelectedPromp="All",
    currentValues=[],
    ...props
}) => {

    const wrapperRef = useRef()
    const [ showOptions, setShowOptions ] = useState(false)
    const [ selectedIds, setSelectedIds ] = useState([])

    const handleCloseOptions = () => {
        setShowOptions(false)
    }

    const handleToggleOptions = () => {
        setShowOptions(prev => !prev)
    }

    const handleOptionsPress = (_, index) => {
        if (selectedIds.includes(index)) {
            setSelectedIds(prev => prev.filter(id => id !== index))
            onSelect(prev => prev.filter(val => val !== items[index]))
            return
        }
        setSelectedIds(prev => [...prev, index])
        onSelect(prev => [ ...prev, items[index]])
    }

    const handleUpdateIds = () => {
        const currentValueIds = currentValues.map(value => items.indexOf(value))
        if (selectedIds.sort().join('') !== currentValueIds.sort().join('')){
            setSelectedIds(currentValueIds)
        }
    }

    useEffect(handleUpdateIds, [currentValues, items, selectedIds])
    useOnClickedOutSide(wrapperRef, handleCloseOptions)

    return (
        <div className="relative w-fit"
            ref={wrapperRef}
        >
            <EButton className={`flex items-center justify-between p-2 text-sm min-w-[80px] hover:bg-slate-100 border ${buttonClassName}`}
                onClick={handleToggleOptions}
            >
                <ul className="flex items-center gap-2 justify-start pr-4">
                    {selectedIds.length === items.length 
                    ? allSelectedPromp:
                    !selectedIds.length 
                    ? noSelectedPromp :
                    selectedIds.map(id => (
                        <span className="bg-blue-400 text-white px-2"
                            key={id}
                        >
                            {displayItems? displayItems[id] : items[id]}
                        </span>
                    ))}
                </ul>
                <FontAwesomeIcon className="text-xs" icon={faChevronDown}/>
            </EButton>
            {showOptions &&
            <ul className={`bg-white shadow-md min-w-[100px] flex flex-col absolute left-0 top-10 overflow-y-auto z-20 ${className}`}
                {...props}
            >
                {items.map((item, index) => {
                    return (
                    <SelectorOption
                        className={optionClassName}
                        key={index}
                        index={index}
                        value={item}
                        isSelected={selectedIds.includes(index)}
                        onSelect={handleOptionsPress}
                    >
                        {displayItems[index]}
                    </SelectorOption>
                )})}
            </ul>}
        </div>
        )
}