import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ScreenHome from './screens/Home'
import ScreenAuthLogin from './screens/auth/Login'
import ScreenUserCreate from './screens/User/Create'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ScreenHome />
  },
  {
    path: 'auth/login',
    element: <ScreenAuthLogin />
  },
  {
    path: 'users/create',
    element: <ScreenUserCreate />
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
