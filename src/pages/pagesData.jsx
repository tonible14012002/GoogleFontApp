import Home from './Home'
import FontDetail from './FontDetail'

const pagesData = [
  {
    path: '',
    element: Home,
    title: 'home'
  },
  {
    path: 'specimen/:familyName',
    element: FontDetail,
    title: 'font-detail'
  }
]

export default pagesData
