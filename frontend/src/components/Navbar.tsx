import { useNavigate } from "react-router-dom"

import AuthService from "../services/AuthService"

const Navbar: React.FC = () => {

  const navigate = useNavigate()

  const logout = () => {
    AuthService.logout()
      .then(resp => {
        navigate('/login')
      })
  }

  return (
    <nav>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}

export default Navbar