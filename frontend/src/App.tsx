import {
  createBrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Welcome from "./screens/Welcome";
import ScreenAuthLogin from "./screens/auth/Login";
import ScreenAuthRegister from "./screens/auth/Register";
import Root from "./screens/Root";
import ScreenTaskEdit from "./screens/task/Edit";
import ScreenTaskCreate from "./screens/task/Create";
import ScreenTaskList from "./screens/task/List";
import ScreenUserEdit from "./screens/user/Edit";
import { getToken } from "./services/auth";
import ScreenUserDelete from "./screens/user/Delete";
import NotFound from "./screens/error/NotFound";

const RoutePrivate = ({ children }) => {
  return getToken() ? children : <Navigate to='/login' />
}

const RoutesLoggedOut = ({ children }) => {
  return !getToken() ? children : <Navigate to='/dashboard/tasks' />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: 'login',
    element: (
      <RoutesLoggedOut>
        <ScreenAuthLogin />
      </RoutesLoggedOut>
    )
  },
  {
    path: 'register',
    element: (
      <RoutesLoggedOut>
        <ScreenAuthRegister />
      </RoutesLoggedOut>
    )
  },
  {
    path: 'dashboard',
    element: (
      <RoutePrivate>
        <Root />
      </RoutePrivate>
    ),
    children: [
      {
        path: 'tasks',
        element: <ScreenTaskList />,
        children: [
          {
            path: ':taskId/edit',
            element: <ScreenTaskEdit />
          },
        ]
      },
      {
        path: 'tasks/create',
        element: <ScreenTaskCreate />
      },
      {
        path: 'profile',
        element: <ScreenUserEdit />,
        children: [
          {
            path: 'delete',
            element: <ScreenUserDelete />
          }
        ]
      },
    ]
  },
  {
    path: '/*',
    element: <NotFound />
  }
])

export default router