import EButton from "../../../../components/EButton"

const Header = () => {

    return (
        <header className="h-[70px] w-full px-4 laptop:px-18 tablet:px-6 flex justify-between items-center">
            <section className="h-full items-center font-semibold flex w-fit">
                <EButton className="bg-gradient-to-br from-blue-500 to-sky-500 text-white w-10 h-10 flex items-center justify-center text-3xl font-bold"
                    to="/"
                >
                    F
                </EButton>
            </section>
            <nav className="flex items-center font-medium">
                <EButton className="text-blue-400 hover:bg-blue-50 hover:text-blue-800 py-2 px-4 rounded"
                    to="/"
                >
                    Fonts
                </EButton>
                <EButton className="text-blue-400 hover:bg-blue-50 hover:text-blue-800 py-2 px-4 rounded"
                    onClick={() => alert("Comming soon...")}
                >
                    Icons
                </EButton>
            </nav>
        </header>
    )
}

export default Header