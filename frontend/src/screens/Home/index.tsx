import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import UserContext from "../../contexts/UserContext"

const ScreenHome: React.FC = () => {
  const [total, setTotal] = useState(0)
  return (
    <div>
      <Navbar />
      <Outlet />
      <UserContext.Provider value={[total, setTotal]}>
        <p>{total}</p>
      </UserContext.Provider>
    </div>
  )
}

export default ScreenHome