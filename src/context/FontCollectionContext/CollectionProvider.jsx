import { createContext, useContext, useReducer, useState } from 'react'
import fontCollectionReducer from './fontCollectionReducer'

const FontCollectionContext = createContext()
const useFontCollection = () => useContext(FontCollectionContext)

const FontCollectionProvider = ({ children }) => {
  const [collection, dispatcher] = useReducer(fontCollectionReducer, {})
  const [showCollection, setShowCollection] = useState(false)

  return (
    <FontCollectionContext.Provider
      value={{
        collection,
        dispatcher,
        showCollection,
        setShowCollection
      }}
    >
      {children}
    </FontCollectionContext.Provider>
  )
}

export { useFontCollection, FontCollectionProvider }
