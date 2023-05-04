import Footer from "../components/Footer"
import Header from "./components/Header"
import FontCollectionBar from "./components/FontCollectionBar"
import { useFontCollection } from "../../context/FontCollectionContext/CollectionProvider"

const DefaultLayout = ({children}) => {

    const { showCollection } = useFontCollection()

    return (
        <>
            <Header/>
            <main id="content" className="flex w-full min-h-[calc(100vh-120px)]">
                <div className={`max-w-full flex-1 transition-all ${showCollection && "laptop:pr-[300px]"}`}>
                    {children}
                </div>
            </main>
            <FontCollectionBar/>
            <Footer/>
        </>
    )
}

export default DefaultLayout