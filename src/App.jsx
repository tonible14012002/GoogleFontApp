import { BrowserRouter } from 'react-router-dom'
import Router from './pages/routes'
import 'react-tooltip/dist/react-tooltip.css'
import { FontProvider } from './context/FontContext'
import { FontCollectionProvider } from './context/FontCollectionContext'

function App() {
  return (
    <FontCollectionProvider>
      <FontProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </FontProvider>
    </FontCollectionProvider>
  )
}

export default App
