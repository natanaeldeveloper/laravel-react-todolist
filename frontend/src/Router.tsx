import { createBrowserRouter } from 'react-router-dom'
import ScreenHome from './screens/Home'

const router = createBrowserRouter([
  {
    path: 'home',
    element: <ScreenHome />
  }
])

export default router