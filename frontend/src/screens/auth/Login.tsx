import { useState } from "react"
import { LoginOutlined } from "@ant-design/icons"
import { Form, Input, Card, Row, Col, Button, message } from "antd"
import { Link, useNavigate } from 'react-router-dom'

import { setToken } from "../../services/auth"
import api from "../../services/api"

const ScreenAuthLogin = () => {

  const [formLoading, setFormLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const onSubmit = (params: object) => {
    setFormLoading(true)

    api.post('auth/login', params)
      .then(response => response.data)
      .then(response => {

        setToken(response.token)

        messageApi.success({
          type: 'success',
          content: response?.message
        })

        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      })
      .catch(error => {
        messageApi.error({
          type: 'error',
          content: error.response.data?.message
        })
      })
      .finally(() => setFormLoading(false))
  }

  return (
    <Row justify='center' style={{ marginTop: 50 }}>
      {contextHolder}
      <Col span={8} xs={20} sm={16} lg={10}>
        <Card
          title='Formulário de Login'
        >
          <Form
            name='login'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            onFinish={onSubmit}
            validateMessages={{ required: '${alias} é obrigatório.' }}
          >
            <Form.Item
              label='Email'
              name='email'
              messageVariables={{ alias: 'Email' }}
              rules={[{ required: true }]}

            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Senha'
              name='password'
              messageVariables={{ alias: 'Senha' }}
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>

            <Col sm={{ offset: 5 }} style={{ marginBottom: 12 }}>
              <span>Ainda não possue uma conta?</span>
              <Link to='/register'>&nbsp;Realizar cadastro</Link>
            </Col>

            <Form.Item wrapperCol={{ offset: 5 }}>
              <Button
                type='primary'
                htmlType='submit'
                loading={formLoading}
              >
                Entrar <LoginOutlined />
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default ScreenAuthLogin