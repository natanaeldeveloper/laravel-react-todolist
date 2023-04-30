import { Outlet } from "react-router-dom"
import { Col, Row } from "antd"

import Navbar from "../components/Navbar"

const Root = () => {

  return (
    <Row>
      <Col xs={{ span: 4 }}>
        <Navbar />
      </Col>
      <Col xs={{ span: 20 }} style={{ padding: '1rem' }}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default Root