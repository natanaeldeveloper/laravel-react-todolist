import { useEffect, useState } from "react"
import { LoginOutlined, FastBackwardOutlined } from "@ant-design/icons"
import { Form, Input, Card, Row, Col, Button, message } from "antd"
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { setID, setToken } from "../../services/auth"
import api from "../../services/api"

const ScreenAuthLogin = () => {

  const [formLoading, setFormLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { state } = useLocation()

  const onSubmit = (params: object) => {
    setFormLoading(true)

    api.post('auth/login', params)
      .then(res => res.data)
      .then(res => {

        setToken(res.token)
        setID(res.id)

        messageApi.success({
          type: 'success',
          content: res.message
        })

        navigate('/dashboard/tasks', {
          state: {
            message: {
              type: 'success',
              content: res.message
            }
          }
        })
      })
      .catch(error => {
        const res = error.response.data
        if (res?.message) {
          messageApi.error({
            type: 'error',
            content: res.message
          })
        }
      })
      .finally(() => setFormLoading(false))
  }

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

            <Col sm={{ offset: 5 }} style={{ marginBottom: 5 }}>
              <span>Ainda não possue uma conta?</span>
              <Link to='/register'>&nbsp;Realizar cadastro.</Link>
            </Col>

            <Col sm={{ offset: 5 }} style={{ marginBottom: 16 }}>
              <span>Voltar para a página inicial</span>
              <Link to='/'>&nbsp; clique aqui.</Link>
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