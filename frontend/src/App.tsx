import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ScreenHome from './screens/Home'
import ScreenAuthLogin from './screens/Auth/Login'
import ScreenAuthRegister from './screens/Auth/Register'

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
    path: 'auth/register',
    element: <ScreenAuthRegister />
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
