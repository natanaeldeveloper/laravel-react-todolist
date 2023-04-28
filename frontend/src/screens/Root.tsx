import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar"
import { Row } from "antd"

const Root: React.FC = () => {
  return (
    <Row>
      <Navbar />
      <Outlet />
    </Row>
  )
}

export default Root