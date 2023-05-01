import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { LoginOutlined } from "@ant-design/icons"
import { Form, Input, Card, Row, Col, Button, message } from "antd"

import { setID, setToken } from "../../services/auth"
import api from "../../services/api"

const ScreenAuthRegister = () => {

  const [formLoading, setFormLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [errorFormFields, setErrorFormFields] = useState<any>({})
  const navigate = useNavigate()

  const onSubmit = (params: object) => {
    setFormLoading(true)
    setErrorFormFields({})

    api.post('auth/register', params)
      .then(res => res.data)
      .then(res => {

        setToken(res.token)
        setID(res.data.id)

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

        if (res?.errors) {
          setErrorFormFields(res.errors)
        }
      })
      .finally(() => setFormLoading(false))
  }

  const errorFieldProps = (key: string) => ({
    validateStatus: 'error',
    help: errorFormFields[key][0]
  })

  return (
    <Row justify='center' style={{ marginTop: 50 }}>
      {contextHolder}
      <Col span={8} xs={24} sm={20} md={16} lg={12}>
        <Card
          title='Formulário de Registro'
        >
          <Form
            name='register'
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            onFinish={onSubmit}
            validateMessages={{
              required: '${alias} é obrigatório.',
              string: {
                min: '${alias} deve ter no mínimo ${min} caracteres',
              }
            }}
          >
            <Form.Item
              label='Nome'
              name='name'
              messageVariables={{ alias: 'Nome' }}
              rules={[{ required: true, min: 3 }]}
              hasFeedback
              {...errorFormFields.password && errorFieldProps('name')}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              messageVariables={{ alias: 'Email' }}
              rules={[{ required: true }]}
              hasFeedback
              {...errorFormFields.email && errorFieldProps('email')}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Senha'
              name='password'
              messageVariables={{ alias: 'Senha' }}
              rules={[{ required: true, min: 8 }]}
              hasFeedback
              {...errorFormFields.password && errorFieldProps('password')}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label='Confirmar Senha'
              name='confirm'
              messageVariables={{ alias: 'Confirmar Senha' }}
              dependencies={['password']}
              hasFeedback
              {...errorFormFields.confirm && errorFieldProps('confirm')}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Senhas não compatíveis!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Col sm={{ offset: 7 }} style={{ marginBottom: 5 }}>
              <span>Já possue uma conta?</span>
              <Link to='/login'>&nbsp;Realizar login</Link>
            </Col>

            <Col sm={{ offset: 7 }} style={{ marginBottom: 16 }}>
              <span>Voltar para a página inicial</span>
              <Link to='/'>&nbsp; clique aqui.</Link>
            </Col>

            <Form.Item wrapperCol={{ sm: { offset: 7 } }}>
              <Button
                type='primary'
                htmlType='submit'
                loading={formLoading}
              >
                Registrar-se <LoginOutlined />
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default ScreenAuthRegister