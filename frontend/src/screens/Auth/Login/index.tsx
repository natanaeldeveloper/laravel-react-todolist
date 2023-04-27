import { Form, Input, Checkbox, Card, Row, Col, Button } from "antd"
import { LoginOutlined } from "@ant-design/icons"
import { useState } from "react"
import AuthService from "../../../services/AuthService"

const ScreenAuthLogin: React.FC = () => {

  const [loading, setLoading] = useState(false)

  const submitForm = (values: object) => {
    setLoading(true)

    AuthService.login(values)
      .then((resp) => {
        console.log('finish', resp)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Row justify='center' style={{ marginTop: 27 }}>
      <Col span={8} xs={20} sm={14} lg={10}>
        <Card
          title='Formulário de Login'
        >
          <Form
            name='login'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            onFinish={submitForm}
          >
            <Form.Item
              label='Email'
              name='email'
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='password'
              name='password'
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              valuePropName='checked'
              name='remember'
              wrapperCol={{ offset: 5 }}
            >
              <Checkbox>Lembrar de mim</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 5 }}
            >
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
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