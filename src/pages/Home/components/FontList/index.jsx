import { useFontContext } from "../../../../context/FontContext"
import FontCard from "./FontCard"
import { memo, useLayoutEffect, useState } from "react"
import { AutoSizer, CellMeasurer, CellMeasurerCache, Grid, WindowScroller } from "react-virtualized"
import { useRef } from "react"
import 'react-virtualized/styles.css';



const FontList = ({
    fontSize=20,
    previewText,
}) => {

    const { fonts } = useFontContext()
    const gridRef = useRef()
    const [ screenWidth, setScreenWidth ] = useState(1000)

    const cache = useRef(new CellMeasurerCache({
        // keyMapper: (rowIndex, columnIndex) => fonts[rowIndex * 3 + columnIndex].family,
        defaultHeight: 400,
        fixedWidth: true
    }))

    const handleCellRender = ({columnIndex, key, rowIndex, style, parent}) => {
        const fontIndex = rowIndex * 3 + columnIndex
        if (fontIndex >= fonts.length) return null
        const fontData = fonts[fontIndex]
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

    useLayoutEffect(() => {
        cache.current.clearAll()
        gridRef.current && gridRef.current.recomputeGridSize()
    }, [previewText, screenWidth, fontSize])

    return (
        <div className="w-full">
            <div className="m-auto">

        <WindowScroller
            autoContainerWidth
        >
            {({height, scrollTop, onChildScroll}) => {
                return (
                    <AutoSizer 
                        disableHeight
                        autoContainerWidth
                        onResize={({width}) => setScreenWidth(width)}
                    >
                        {({width}) => {
                            return (
                                    <Grid
                                        ref={ref => gridRef.current = ref}
                                        autoContainerWidth
                                        autoHeight
                                        height={height}
                                        width={width}
                                        columnWidth={screenWidth / 3}
                                        columnCount={3}
                                        overscanRowCount={10}
                                        scrollTop={scrollTop}
                                        onScroll={onChildScroll}
                                        cellRenderer={handleCellRender}
                                        rowHeight={cache.current.rowHeight}
                                        rowCount={fonts.length / 3 + 1}
                                    />
                            )
                        }}
                    </AutoSizer>
                )
            }}
        </WindowScroller>
            </div>
        </div>
    )
}

export default memo(FontList)