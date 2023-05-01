import { useState } from "react"
import { Button, Card, Col, DatePicker, Form, Input, Row, Space, message } from "antd"
import { SaveOutlined } from '@ant-design/icons'
import DebounceSelect from "../../components/DebounceSelect"
import api from "../../services/api"

const ScreenTaskCreate = () => {

  const [messageApi, contextHolder] = message.useMessage()
  const [searchedValue, setSearchedValue] = useState<any>()
  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<any>({})
  const { TextArea } = Input
  const [form] = Form.useForm()

  const fetchUserList = (email: string) => {
    return api.get('users', {
      params: {
        filters: {
          email: [email]
        }
      }
    })
      .then(res => res.data.data)
      .catch(error => {
        messageApi.error({
          type: 'error',
          content: error.response.data?.message
        })
      })
  }

  const onFinish = (values: any) => {
    setFormLoading(true)
    setFormErrors({})
    api.post('tasks', values)
      .then(res => res.data)
      .then(res => {
        form.resetFields()
        messageApi.success({
          type: 'success',
          content: res.message
        })
      })
      .catch(error => {
        const res = error.response.data

        if (res.message) {
          messageApi.error({
            type: 'success',
            content: error.response.data?.message
          })
        }

        if (res.errors) {
          setFormErrors(res.errors)
        }
      })
      .finally(() => setFormLoading(false))
  }

  const getFormatedErrors = (field: string) => ({
    validateStatus: 'error',
    help: formErrors[field][0]
  })

  return (
    <>
      {contextHolder}
      <Row justify={"center"} style={{ marginTop: 50 }}>
        <Col md={{ span: 18 }} span={24}>
          <Card
            title="Nova tarefa"
          >
            <Form
              form={form}
              labelCol={{ xs: { span: 10 }, sm: { span: 7 } }}
              wrapperCol={{ sm: { span: 16 } }}
              onFinish={onFinish}
              validateMessages={{
                required: '${alias} é obrigatório!',
                string: {
                  min: '${alias} deve ter no mínimo 3 caracteres!'
                },
              }}
            >
              <Form.Item
                label='Data de conclusão'
                name='date_conclusion'
                messageVariables={{ alias: 'Data conclusão' }}
                rules={[{ required: true }]}
                hasFeedback
                {...formErrors.date_conclusion && getFormatedErrors('date_conclusion')}
              >
                <DatePicker placeholder="YYYY-MM-DD" />
              </Form.Item>

              <Form.Item
                label='Responsável'
                name='responsible_id'
                messageVariables={{ alias: 'Responsável' }}
                rules={[{ required: true }]}
                hasFeedback
                {...formErrors.responsible_id && getFormatedErrors('responsible_id')}
              >
                <DebounceSelect
                  value={searchedValue}
                  fieldNames={{ label: 'email', value: 'id' }}
                  placeholder="email do responsável"
                  fetchOptions={fetchUserList}
                  onChange={setSearchedValue}
                  defaultOptions={[]}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label='Descrição'
                name='description'
                messageVariables={{ alias: 'Descrição' }}
                rules={[{ required: true, min: 3 }]}
                hasFeedback
                {...formErrors.description && getFormatedErrors('description')}
              >
                <TextArea />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 7 }}>
                <Space>
                  <Button loading={formLoading} htmlType="submit" type="primary">Cadastrar <SaveOutlined /></Button>
                  <Button onClick={() => { form.resetFields() }}>Limpar</Button>
                </Space>
              </Form.Item>

            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ScreenTaskCreate