import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import ScreenHome from './screens/Home'
import ScreenAuthLogin from './screens/auth/Login'
import ScreenAuthRegister from './screens/auth/Register'
import TokenService from './services/TokenService'

const RoutePrivate = ({ element, redirectTo }) => {
  return TokenService.authenticated() ? element : <Navigate to={redirectTo} />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<ScreenAuthLogin />} />
        <Route path='/register' element={<ScreenAuthRegister />} />

        <Route
          path='/home'
          element={
            <RoutePrivate
              redirectTo="/login"
              element={<ScreenHome />}
            />
          }
        >
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App