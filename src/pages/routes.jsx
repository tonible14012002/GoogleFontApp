import { Route, Routes } from "react-router-dom"
import pagesData from "./pagesData"
import DefaultLayout from "../layouts/DefaultLayout"
import { FontProvider } from "../context/FontContext"
import { FontCollectionProvider } from "../context/FontCollectionContext"
import ScrollToTop from "../components/ScrollToTop"



const Router = () => {

    const pageRoutes = pagesData.map(({path, title, element, layout}) => {
        const Page = element
        const Layout = layout || DefaultLayout
        return (
            <Route 
                key={title}
                path={path}
                element={
                    <Layout>
                        <Page/>
                    </Layout>
                }
            />
        )
    })

    return (
        <FontCollectionProvider>
            <FontProvider>
                <ScrollToTop>
                    <Routes>
                        {pageRoutes}
                    </Routes>
                </ScrollToTop>
            </FontProvider>
        </FontCollectionProvider>
    )
}

export default Router