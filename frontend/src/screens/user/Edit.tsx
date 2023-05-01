import { useState, useEffect } from "react"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Form, Input, Card, Row, Col, Button, message, Skeleton, Popconfirm } from "antd"

import api from "../../services/api"
import { getID } from "../../services/auth"
import { Link, Outlet } from "react-router-dom"

const ScreenUserEdit = () => {

  const [fetchLoading, setFetchLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [formErrors, setFormErrors] = useState<any>({})
  const [form] = Form.useForm()
  const userId = getID()

  const fetchUser = () => {
    setFetchLoading(true)
    api.get(`users/${userId}`)
      .then(res => res.data)
      .then(res => {
        form.setFieldsValue(res.data)
        setFetchLoading(false)

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

  const onSubmit = (values: object) => {
    setFormLoading(true)
    setFormErrors({})

    api.put(`users/${userId}`, values)
      .then(res => res.data)
      .then(res => {
        messageApi.success({
          type: 'success',
          content: res.message
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
          setFormErrors(res.errors)
        }
      })
      .finally(() => setFormLoading(false))
  }

  const errorFieldProps = (key: string) => ({
    validateStatus: 'error',
    help: formErrors[key][0]
  })

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <Row justify='center' style={{ marginTop: 50 }}>
      {contextHolder}
      <Col span={8} xs={24} sm={20} md={16} lg={12}>
        <Card
          title='Gerenciar seus dados'
        >
          <Form
            form={form}
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
            <Skeleton
              loading={fetchLoading}
            >
              <Form.Item
                label='Nome'
                name='name'
                messageVariables={{ alias: 'Nome' }}
                rules={[{ required: true, min: 3 }]}
                hasFeedback
                {...formErrors?.name && errorFieldProps('name')}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Email'
                name='email'
                messageVariables={{ alias: 'Email' }}
                rules={[{ required: true }]}
                hasFeedback
                {...formErrors?.email && errorFieldProps('email')}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ sm: { offset: 7 } }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={formLoading}
                >
                  Atualizar <EditOutlined />
                </Button>
              </Form.Item>
            </Skeleton>
          </Form>
        </Card>
        <br />
        <Card
          title='Mais opções'
        >
          <Row justify={"start"}>
            <Col style={{ marginBottom: 16 }} span={24}>
              <Link to={'delete'}><Button style={{ color: 'red', width: '100%' }}><DeleteOutlined /> Excluir conta </Button></Link>
            </Col>
          </Row>
        </Card>
      </Col>
      <Outlet />
    </Row>
  )
}

export default ScreenUserEdit