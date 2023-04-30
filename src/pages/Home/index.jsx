import { useState } from "react"
import FilterBar from "./components/FilterBar"
import FontList from "./components/FontList"
import ToolBar from "./components/ToolBar"
import { useCallback } from "react"
import ContentLayout from "../../components/ContentLayout"

const Home = () => {

    const [ fontSize, setFontSize ] = useState(0)
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
                // fontSize={fontSize}
            />
            <ContentLayout>
                <FontList
                    fontSize={fontSize}
                    previewText={previewText}
                />
            </ContentLayout>
        </>
    )
}

export default Home