import { useFontContext } from "../../../../context/FontContext"
import { useSearchParams } from "react-router-dom"
import { useMemo, memo, useRef, useLayoutEffect, useState, useCallback, useEffect } from "react"

import { AutoSizer, CellMeasurer, CellMeasurerCache, Grid, WindowScroller } from "react-virtualized"
import FontCard from "./FontCard"
import { DEFAULT_LANGUAGE_FILTER_VALUE, getFilterLanguageFromParam } from "../../utils/Languages"
import { CATEGORY_CHOICES_VALUES, getCategoriesFromParam } from "../../utils/Category";
import { getQueryFromParam } from "../../utils/Query"

const FontList = ({
    fontSize=20,
    previewText,
}) => {

    const { fonts } = useFontContext()
    const gridRef = useRef()
    const [ columnCount, setColumnCount ] = useState(3)
    const [ columnWidth, setColumnWidth ] = useState(400)

    const cache = useRef(new CellMeasurerCache({
        defaultHeight: 400,
        fixedWidth: true
    }))

    const [ searchParams ] = useSearchParams()
    const [ languageFilter ] = getFilterLanguageFromParam(searchParams)
    const [ categoriesFilter ] = getCategoriesFromParam(searchParams)
    const [ query ] = getQueryFromParam(searchParams)

    const categoriesFilterString = categoriesFilter.join(",")
    // 
    const filteredFonts = useMemo(() => {
        const cateFilter = categoriesFilterString.split(",")
        let cateFilterEach
        let langFilterEach
        let queryFilterEach = (item => {
            return (
            item.family
            .toLowerCase()
            .indexOf(query.replace("+", " ").toLowerCase()) !== -1
            )}
        )

        if (cateFilter.length != CATEGORY_CHOICES_VALUES.length) {
            cateFilterEach = (item) => cateFilter.includes(item.category)
        }
        if (languageFilter !== DEFAULT_LANGUAGE_FILTER_VALUE) {
            langFilterEach = (item) => item.subsets.includes(languageFilter)
        }
        return (
            fonts.filter((font) => (
                (cateFilterEach ? cateFilterEach(font) : true) &&
                (langFilterEach ? langFilterEach(font): true) &&
                queryFilterEach(font)
            )) 
        )
    }, [languageFilter, fonts, categoriesFilterString, query])

    const rowCount = Math.floor(filteredFonts.length / columnCount)
        + Math.ceil((filteredFonts.length % columnCount))

    const handleResize = useCallback(({width}) => {
        if (width > 1280) { // laptop
            setColumnCount(3)
            setColumnWidth(width / 3)
            return
        } 
        if (width > 640) {  // tablet
            setColumnCount(2)
            setColumnWidth(width / 2)
            return
        }
        setColumnCount(1)
        setColumnWidth(width)
    }, [])

    const handleUpdateCache = () => {
        cache.current.clearAll()
        gridRef.current && gridRef.current.recomputeGridSize()
    }

    useEffect(() => {
        console.log('asdasd', languageFilter)    
    }, [languageFilter])

    useLayoutEffect(handleUpdateCache, [previewText, fontSize])

    const handleCellRender = ({columnIndex, key, rowIndex, style, parent}) => {
        const fontIndex = rowIndex * 3 + columnIndex
        if (fontIndex >= filteredFonts.length) return null
        const fontData = filteredFonts[fontIndex]
        return (
            <CellMeasurer
                cache={cache.current}
                columnIndex={columnIndex}
                rowIndex={rowIndex}
                key={key}
                parent={parent}
            >
                <div
                    style={style}
                    className="p-4 min-h-[300px]"
                >
                    <FontCard
                        data={fontData}
                        previewText={previewText}
                        fontSize={fontSize}
                    />
                </div>
            </CellMeasurer>
        )
    }

    return (
        <div className="w-full mb-14">
        <WindowScroller
            autoContainerWidth
        >
            {({height, scrollTop, onChildScroll}) => {
                return (
                    <AutoSizer 
                        disableHeight
                        autoContainerWidth
                        onResize={handleResize}
                    >
                        {({width}) => {
                            console.log('scrollTop', scrollTop)
                            return (
                                <Grid
                                    ref={ref => gridRef.current = ref}
                                    autoContainerWidth
                                    autoHeight
                                    height={height}
                                    width={width}
                                    columnWidth={columnWidth}
                                    columnCount={columnCount}
                                    scrollTop={scrollTop}
                                    onScroll={onChildScroll}
                                    cellRenderer={handleCellRender}
                                    rowHeight={cache.current.rowHeight}
                                    rowCount={rowCount}
                                    // scrollToColumn={-1}
                                    // scrollToRow={-1}
                                />
                            )
                        }}
                    </AutoSizer>
                )
            }}
        </WindowScroller>
        </div>
    )
}

export default memo(FontList)