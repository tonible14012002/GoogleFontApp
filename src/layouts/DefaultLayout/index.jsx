import { useEffect, useLayoutEffect } from "react"
import Footer from "../components/Footer"
import Header from "./components/Header"

const DefaultLayout = ({children}) => {

    return (
        <div className="h-[100vh] overflow-auto">
            <Header/>
            <main className="w-full max-w-[1800px] px-2 laptop:px-16 tablet:px-4 m-auto min-h-[calc(100vh-120px)]">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default DefaultLayout