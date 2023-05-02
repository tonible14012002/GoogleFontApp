import ReactDOM from "react-dom"
import EButton from "../EButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faClose, faDownload, faMinus, faMinusCircle } from "@fortawesome/free-solid-svg-icons"
import { useFontCollection } from "../../context/FontCollectionContext/CollectionProvider"

const exampleCollections= {
    "Roboto": [
        "italy",
        "regular400"
    ]
}

const FontCollectionBar = ({onClose}) => {

    const { collection, dispatcher, showCollection, setShowCollection } = useFontCollection()

    const handleClosePress = () => {
        setShowCollection(false)
    }

    return ReactDOM.createPortal(
        <div className={`fixed flex flex-col top-0 right-0 bg-white shadow-lg h-[100vh] w-[300px] z-50 transition-transform ${showCollection && "translate-x-full"}`}>
            <div className="flex items-center justify-between p-4 h-[70px] border-b">
                <h3 className="">Selected family</h3>
                <EButton className=""
                    onClick={handleClosePress}
                >
                    <FontAwesomeIcon icon={faClose}/>
                </EButton>
            </div>

            <section className="p-4 max-h-[360px]">
                <h3 className="text-sm pb-4 font-medium">Review</h3>
                <ul className="border">
                    {Object.keys(exampleCollections).map((family) => {
                        return (
                            <div className=""
                                key={family}
                            >
                                <EButton className="flex items-center justify-between w-full p-4 hover:bg-slate-50">
                                    <h3 className="text-blue-600">
                                        {family}
                                    </h3>
                                    <span className="text-sm">
                                        <FontAwesomeIcon icon={faChevronDown}/>
                                    </span>
                                </EButton>
                                <ul className="px-4 text-zinc-600">
                                    {exampleCollections[family].map(category => (
                                        <div className="flex items-center justify-between w-full py-2 text-sm"
                                            key={category}
                                        >
                                            <span>
                                                {category}
                                            </span>
                                            <EButton className="hover:bg-blue-100 w-5 h-5 rounded-full">
                                                <FontAwesomeIcon icon={faMinus}/>
                                            </EButton>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </ul>
            </section>

            <section className="border-t p-4 flex-1">
                    <h3 className="text-sm font-medium">Use on the web</h3>
                    <p className="text-sm text-zinc-500 mt-4">To embed a font, copy the code into the 	&lt;head&gt; of your html</p>
            </section>

            <section className="p-2 border-t">
                <EButton className="w-full text-center bg-blue-500 text-white p-3 flex items-center gap-2 justify-center hover:bg-blue-600 transition-colors">
                    <FontAwesomeIcon icon={faDownload}/>
                    <span>
                        Download all
                    </span>
                </EButton>
            </section>
        </div>
    , document.querySelector("body"))
}

export default FontCollectionBar