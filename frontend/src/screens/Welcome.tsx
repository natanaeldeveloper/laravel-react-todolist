import { useEffect } from 'react'
import { Button, Col, Row, Space, message } from "antd"
import { LoginOutlined } from '@ant-design/icons'
import { Link, useLocation } from "react-router-dom"

const Welcome = () => {

  const { state } = useLocation()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (state?.message) {

      if (state.message.type == 'success') {
        messageApi.success({
          type: state.message.type,
          content: state.message.content
        })
      }

      if (state.message.type == 'error') {
        messageApi.error({
          type: state.message.type,
          content: state.message.content
        })
      }
    }
  }, [state])

  return (
    <Row justify={"center"} align={"middle"} style={{ height: '80vh' }}>
      {contextHolder}
      <Col>
        <Row justify={"center"}>
          <p style={{ fontSize: 16 }}>Gerenciador de Tarefas</p>
        </Row>
        <Row justify={"center"}>
          <Space>
            <Link to={'login'}><Button size="middle">Login <LoginOutlined /></Button></Link>
            <Link to={'register'}><Button size="middle" type="primary">Registrar-se</Button></Link>
          </Space>
        </Row>
      </Col>
    </Row>
  )
}

export default Welcome