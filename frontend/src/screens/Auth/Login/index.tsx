import { useState } from "react"
import { Form, Input, Card, Row, Col, Button, message } from "antd"
import { LoginOutlined } from "@ant-design/icons"

import AuthService from "../../../services/AuthService"

const ScreenAuthLogin: React.FC = () => {

  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState('')
  const [messageApi, contextHolder] = message.useMessage()

  const onSubmit = (props: object) => {
    setFormLoading(true)
    setFormErrors('')

    AuthService.login(props)
      .then(resp => {
        messageApi.success({
          type: 'success',
          content: resp.message
        })
      })
      .catch((err) => setFormErrors(err.response.data.message))
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
          >
            <Form.Item
              label='Email'
              name='email'
              validateStatus={formErrors && 'error'}
              help={formErrors}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='password'
              name='password'
              validateStatus={formErrors && 'error'}
              help={formErrors}
            >
              <Input.Password />
            </Form.Item>

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