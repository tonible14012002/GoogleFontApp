import { useState } from "react"
import FontList from "./components/FontList"
import ToolBar from "./components/ToolBar"
import ContentLayout from "../../components/ContentLayout"
import FilterBar from "./components/FilterBar"

const Home = () => {

    const [ fontSize, setFontSize ] = useState(0)
    const [ previewText, setPreviewText ] = useState("")
    
    console.log('rerender Home')
    return (
        <>
            <ToolBar
                setPreviewText={setPreviewText}
                setFontSize={setFontSize}
            />
            <FilterBar/>
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
