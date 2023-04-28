import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import ScreenHome from './screens/Home'
import ScreenAuthLogin from './screens/auth/Login'
import TokenService from './services/TokenService'

const RoutePrivate = ({ element, redirectTo }) => {
  return TokenService.authenticated() ? element : <Navigate to={redirectTo} />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/login' element={<ScreenAuthLogin />} />

        <Route
          path='/home'
          element={
            <RoutePrivate
              redirectTo="/auth/login"
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