import { createContext, useContext, useReducer, useState } from "react";
import fontCollectionReducer from "./FontCollectionReducer";
import FontCollectionBar from "../../components/FontCollectionBar";



const FontCollectionContext = createContext()
const useFontCollection = () => useContext(FontCollectionContext)

const FontCollectionProvider = ({children}) => {

    const [ collection, dispatcher ] = useReducer(fontCollectionReducer, {})
    const [ showCollection, setShowCollection ] = useState(false)

    return (
        <FontCollectionContext.Provider
            value={{
                collection,
                dispatcher,
                showCollection,
                setShowCollection
            }}
        >
            <FontCollectionBar/>
            {children}
        </FontCollectionContext.Provider>
    )
}

export { useFontCollection,FontCollectionProvider }