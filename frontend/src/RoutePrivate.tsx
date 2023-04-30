import { Navigate, Route, RouteProps } from "react-router-dom"
import { getToken } from "./services/auth"
import Root from "./screens/Root"

const RoutePrivate = ({ ...rest }) => {
  return <Route {...rest} />
}


export default RoutePrivate