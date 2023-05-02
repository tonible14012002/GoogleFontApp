import Footer from "../components/Footer"
import Header from "./components/Header"

const DefaultLayout = ({children}) => {

    return (
        <>
            <Header/>
            <main className="w-full min-h-[calc(100vh-120px)]">
                {children}
            </main>
            <Footer/>
        </>
    )
}

export default DefaultLayout