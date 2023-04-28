import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar"

const Master: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Master