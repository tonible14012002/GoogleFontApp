import { useState } from "react"
import FilterBar from "./components/FilterBar"
import FontList from "./components/FontList"
import ToolBar from "./components/ToolBar"
import { useCallback } from "react"

const Home = () => {

    const [ fontSize, setFontSize ] = useState(24)
    const [ previewText, setPreviewText ] = useState("")
    
    const handleSetPreviewText = useCallback((value) => {
        setPreviewText(value)
    }, [])

    const handleSetFontSize = useCallback((value) => {
        setFontSize(value)
    }, [])

    console.log('rerender Home')

    return (
        <>
            <ToolBar
                setPreviewText={handleSetPreviewText}
                setFontSize={handleSetFontSize}
            />
            {/* <FilterBar/> */}
            <FontList
                fontSize={fontSize}
                previewText={previewText}
            />
        </>
    )
}

export default Home