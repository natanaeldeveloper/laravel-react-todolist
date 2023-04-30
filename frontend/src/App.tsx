import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Root from './screens/Root'
import ScreenAuthLogin from './screens/auth/Login'
import ScreenAuthRegister from './screens/auth/Register'
import ScreenTaskList from './screens/task/List'
import Welcome from './screens/Welcome'
import ScreenTaskCreate from './screens/task/Create'
import ScreenUserEdit from './screens/user/Edit'

import { getToken } from './services/auth'

import './styles/App.css'
import ScreenTaskEdit from './screens/task/Edit'
import api from './services/api'


const App = () => {

  const RoutePrivate = ({ children }) => {
    return getToken() ? children : <Navigate to='/login' />
  }

  const RoutesLoggedOut = ({ children }) => {
    return !getToken() ? children : <Navigate to='/dashboard' />
  }

  const fetchTask = async (taskId) => {
    const response = await api.get(`tasks/${taskId}`)
    return response.data.data
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
          <Route
            path='tasks/:taskId/edit'
            element={<ScreenTaskEdit />}
            loader={({ params }) => (
              fetchTask(params.taskId)
            )}
          />

          <Route path='tasks/create' element={<ScreenTaskCreate />} />
          <Route path='tasks' element={<ScreenTaskList />} />

          <Route path='users/profile' element={<ScreenUserEdit />} />
          <Route path='profile' element={<ScreenUserEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App