import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EButton from "../../../../components/EButton"
import { faToggleOff } from "@fortawesome/free-solid-svg-icons"
import { useFontCollection } from "../../../../context/FontCollectionContext/CollectionProvider"


const Header = () => {

    // const { setShowCollection } = useFontCollection()

    const handleToggleFontCollection = () => {
        // setShowCollection(prev => !prev)
    }


    return (
        <header className="h-[70px] w-full px-16 flex justify-between items-center">
            <section className="h-full items-center font-semibold flex w-fit">
                <span className="bg-gradient-to-br from-teal-400 to-sky-700 bg-clip-text text-transparent text-2xl font-bold">
                    GoogleFontClone
                </span>
            </section>
            <nav className="flex items-center font-medium">
                <EButton className="text-blue-500 hover:bg-blue-50 hover:text-blue-800 py-2 px-4 rounded">
                    Fonts
                </EButton>
                <EButton className="text-blue-500 hover:bg-blue-50 hover:text-blue-800 py-2 px-4 rounded">
                    Icons
                </EButton>
                <EButton className="text-blue-500 hover:bg-blue-50 hover:text-blue-800 py-2 px-4 rounded"
                    onClick={handleToggleFontCollection}
                >
                    <FontAwesomeIcon  icon={faToggleOff} />
                </EButton>
            </nav>
        </header>
    )
}

export default Header