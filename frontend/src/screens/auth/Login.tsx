import { useEffect, useState } from "react"
import { LoginOutlined } from "@ant-design/icons"
import { Form, Input, Card, Row, Col, Button, message } from "antd"
import { Link, useNavigate } from 'react-router-dom'

import AuthService from "../../services/AuthService"
import TokenService from "../../services/TokenService"

const ScreenAuthLogin: React.FC = () => {

  const [formLoading, setFormLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  useEffect(() => {
    if(TokenService.authenticated()) {
      navigate('/home')
    }
  }, [])

  const onSubmit = (props: object) => {
    setFormLoading(true)

    AuthService.login(props)
      .then(resp => {
        messageApi.success({
          type: 'success',
          content: resp.message
        })
        navigate('/home')
      })
      .catch(err => {
        messageApi.error({
          type: 'error',
          content: err.response.data.message
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
              <Link to='/users/create'>&nbsp;Realizar cadastro</Link>
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