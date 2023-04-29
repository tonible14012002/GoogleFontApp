import { BrowserRouter } from "react-router-dom"
import Router from "./pages/routes"
import 'react-tooltip/dist/react-tooltip.css'
import 'react-virtualized/styles.css';


function App() {
  
  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  )
}

export default App
