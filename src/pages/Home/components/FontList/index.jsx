import { useMemo, memo, useRef, useLayoutEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AutoSizer, CellMeasurer, CellMeasurerCache, Grid, WindowScroller } from 'react-virtualized'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

import FontCard from './components/FontCard'
import EButton from '../../../../components/EButton'
import Modal from '../../../../components/Modal'

import { useFontCollection } from '../../../../context/FontCollectionContext/CollectionProvider'
import { useFontContext } from '../../../../context/FontContext'
import {
  CATEGORY_CHOICES_VALUES,
  DEFAULT_LANGUAGE_FILTER_VALUE
} from '../../../../settings/FontFilterSetting/constants'

import {
  getFilterLanguageFromParam,
  getCategoriesFromParam,
  getQueryFromParam
} from '../../../../settings/FontFilterSetting/utils'

const FontList = ({ fontSize = 20, previewText }) => {
  const { fonts } = useFontContext()
  const { showCollection } = useFontCollection()

  const gridRef = useRef()
  const windowScrollerRef = useRef()
  const [columnCount, setColumnCount] = useState(3)
  const [columnWidth, setColumnWidth] = useState(400)

  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 400,
      fixedWidth: true
    })
  )

  const [searchParams] = useSearchParams()
  const [languageFilter] = getFilterLanguageFromParam(searchParams)
  const [categoriesFilter] = getCategoriesFromParam(searchParams)
  const [query] = getQueryFromParam(searchParams)

  const categoriesFilterString = categoriesFilter.join(',')

  const filteredFonts = useMemo(() => {
    const cateFilter = categoriesFilterString.split(',')
    let cateFilterEach
    let langFilterEach
    let queryFilterEach = (item) => {
      return item.family.toLowerCase().indexOf(query.replace('+', ' ').toLowerCase()) !== -1
    }

    if (cateFilter.length != CATEGORY_CHOICES_VALUES.length) {
      cateFilterEach = (item) => cateFilter.includes(item.category)
    }
    if (languageFilter !== DEFAULT_LANGUAGE_FILTER_VALUE) {
      langFilterEach = (item) => item.subsets.includes(languageFilter)
    }
    return fonts.filter(
      (font) =>
        (cateFilterEach ? cateFilterEach(font) : true) &&
        (langFilterEach ? langFilterEach(font) : true) &&
        queryFilterEach(font)
    )
  }, [languageFilter, fonts, categoriesFilterString, query])

  const rowCount =
    Math.floor(filteredFonts.length / columnCount) + Math.ceil(filteredFonts.length % columnCount)

  const handleResize = useCallback(({ width }) => {
    if (width > 1280) {
      // laptop
      setColumnCount(3)
      setColumnWidth(width / 3)
      return
    }
    if (width > 640) {
      // tablet
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

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCellRender = ({ columnIndex, key, rowIndex, style, parent }) => {
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
        <div style={style} className="p-4 min-h-[300px]">
          <FontCard data={fontData} previewText={previewText} fontSize={fontSize} />
        </div>
      </CellMeasurer>
    )
  }

  useLayoutEffect(handleUpdateCache, [previewText, fontSize])

  return (
    <div className="w-full mb-14">
      <Modal>
        <EButton
          className={`absolute transition-all ${
            showCollection && '-translate-x-[340px]'
          } right-10 bottom-10 laptop:right-20 laptop:bottom-20 z-5 w-14 h-14 rounded-full shadow-2xl bg-white`}
          onClick={handleScrollTop}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </EButton>
      </Modal>
      <WindowScroller autoContainerWidth ref={windowScrollerRef}>
        {({ height, scrollTop, onChildScroll }) => {
          return (
            <AutoSizer disableHeight autoContainerWidth onResize={handleResize}>
              {({ width }) => (
                <Grid
                  ref={(ref) => (gridRef.current = ref)}
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
                />
              )}
            </AutoSizer>
          )
        }}
      </WindowScroller>
    </div>
  )
}

export default memo(FontList)
