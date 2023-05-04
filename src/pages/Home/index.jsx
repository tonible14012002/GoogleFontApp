import { useState } from "react"
import FontList from "./components/FontList"
import ToolBar from "./components/ToolBar"
import ContentLayout from "../../components/ContentLayout"
import FilterBar from "./components/FilterBar"
import { useFontContext } from "../../context/FontContext"

const Home = () => {

    const [ fontSize, setFontSize ] = useState(0)
    const [ previewText, setPreviewText ] = useState("")
    const { fonts } = useFontContext()

    let variant = []
    fonts.map(f => {
        f.variants.map(v => {
            if (!variant.includes(v)) {
                variant.push(v)
            }
        })
    })

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
