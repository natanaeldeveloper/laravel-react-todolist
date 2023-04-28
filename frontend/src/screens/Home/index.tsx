import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

const ScreenHome: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default ScreenHome