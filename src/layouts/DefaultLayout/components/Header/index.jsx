import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import EButton from "../../../../components/EButton"
import { faList, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import ContentLayout from "../../../../components/ContentLayout"


const Header = () => {

    const [ isDarkMode, setIsDarkMode ] = useState(false)

    const handleToggleThemePress = () => {
        setIsDarkMode(prev => !prev)
    }

    useEffect(() => {
        if (isDarkMode)
            document.documentElement.classList.remove("dark")
        else
            document.documentElement.classList.add("dark")
    }, [isDarkMode])

    return (
        <header className="w-full h-[70px]">
            <ContentLayout className="h-full flex justify-between items-center">
                <section className="text-lg h-full items-center gap-2 font-semibold flex w-fit">
                    <span className="bg-gradient-to-br from-red-400 to-rose-600 bg-clip-text text-transparent text-4xl font-bold">
                        GF
                    </span>
                    <span>Google fonts</span>
                </section>
                <nav className="flex gap-10 items-center font-medium">
                <EButton className="hover:text-teal-500 transition-colors underline underline-offset-4">
                        Fonts
                    </EButton>
                    <EButton className="hover:text-teal-500 transition-colors">
                        Icons
                    </EButton>
                    <EButton className="hover:text-teal-500 transition-colors">
                        Source
                    </EButton>
                    <EButton className="w-10 h-10 p-2 rounded-lg dark:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
                        onClick={handleToggleThemePress}
                    >
                        <FontAwesomeIcon  icon={isDarkMode ? faSun: faMoon} />
                    </EButton>
                </nav>
            </ContentLayout>
        </header>
    )
}

export default Header