import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Root from './screens/Root'
import ScreenAuthLogin from './screens/auth/Login'
import ScreenAuthRegister from './screens/auth/Register'
import TokenService from './services/TokenService'
import ScreenTaskList from './screens/task/List'

import './styles/App.css'
import Welcome from './screens/Welcome'
import ScreenTaskCreate from './screens/task/Create'
import ScreenUserEdit from './screens/user/Edit'
import ScreenUserList from './screens/user/List'

const App = () => {

  const RoutePrivate = ({ children }) => {
    return TokenService.authenticated() ? children : <Navigate to='/login' />
  }

  const RoutesLoggedOut = ({ children }) => {
    return !TokenService.authenticated() ? children : <Navigate to='/dashboard' />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route
          path='login'
          element={
            <RoutesLoggedOut>
              <ScreenAuthLogin />
            </RoutesLoggedOut>
          }
        />
        <Route
          path='register'
          element={
            <RoutesLoggedOut>
              <ScreenAuthRegister />
            </RoutesLoggedOut>
          }
        />
        <Route path='dashboard' element={<RoutePrivate> <Root /> </RoutePrivate>} >
          <Route path='tasks' element={<ScreenTaskList />} />
          <Route path='tasks/create' element={<ScreenTaskCreate />} />

          <Route path='users' element={<ScreenUserList />} />
          <Route path='profile' element={<ScreenUserEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App