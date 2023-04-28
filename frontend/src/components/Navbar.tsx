import { message } from "antd"
import { useNavigate } from "react-router-dom"

import AuthService from "../services/AuthService"
import { useContext } from "react"
import UserContext from "../contexts/UserContext"

const Navbar: React.FC = () => {

  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const [total, setTotal] = useContext(UserContext)

  const logout = () => {
    AuthService.logout()
      .then(resp => {
        navigate('/auth/login')
      })
  }

  return (
    <nav>
      <h3>{total}</h3>
      <button onClick={() => { setTotal(total + 1) }}>Logout</button>
    </nav>
  )
}

export default Navbar