import { Route, Routes } from 'react-router-dom'
import pagesData from './pagesData'
import DefaultLayout from '../layouts/DefaultLayout'

const Router = () => {
  const pageRoutes = pagesData.map(({ path, title, element, layout }) => {
    const Page = element
    const Layout = layout || DefaultLayout
    return (
      <Route
        key={title}
        path={path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    )
  })

  return <Routes>{pageRoutes}</Routes>
}

export default Router
