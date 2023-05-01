import { useState, useEffect } from 'react'
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select, Space, message, Skeleton } from "antd"
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { SaveOutlined } from '@ant-design/icons'
import api from '../../services/api'
import DebounceSelect from '../../components/DebounceSelect'
import dayjs from 'dayjs'

const { TextArea } = Input

type SelectType = {
  id: number;
  email: string;
}

const ScreenTaskEdit = () => {

  const [messageApi, contextHolder] = message.useMessage()
  const [formLoading, setFormLoading] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [searchedValue, setSearchedValue] = useState<any>()
  const [formErrors, setFormErrors] = useState<any>({})
  const [selectDefaultOptions, setSelectDefaultOptions] = useState<SelectType[]>([])

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { taskId } = useParams()

  const fetchUserList = (email: string) => (
    api.get('users', {
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
  )

  const fetchTask = () => {
    setModalLoading(true)
    api.get(`tasks/${taskId}`)
      .then(res => res.data.data)
      .then(res => {
        setModalLoading(false)
        setSelectDefaultOptions([res.responsible])
        form.setFieldsValue({
          description: res.description,
          date_conclusion: dayjs(res.date_conclusion),
          responsible_id: res.responsible.id
        })
      })
      .catch(error => {
        messageApi.error({
          type: 'error',
          content: error.response.data?.message
        })
      })
  }

  const onFinish = (values: object) => {
    setFormLoading(true)
    setFormErrors({})
    api.put(`tasks/${taskId}`, values)
      .then(res => res.data)
      .then(res => {
        navigate('/dashboard/tasks', {
          state: {
            updated: true,
            message: res.message,
            data: res.data,
          }
        })
      })
      .catch(error => {
        const res = error.response.data

        messageApi.error({
          type: 'error',
          content: res.message
        })

        if (res.errors) {
          setFormErrors(res.errors)
        }
      })
      .finally(() => setFormLoading(false))
  }

  const onCancel = () => {
    navigate('/dashboard/tasks')
  }

  const getFormatedFormErrors = (field: string) => ({
    validateStatus: 'error',
    help: formErrors[field][0]
  })

  useEffect(() => {
    fetchTask()
  }, [])

  return (
    <div>
      {contextHolder}
      <Modal
        open={true}
        onCancel={onCancel}
        title='Editar dados da tarefa'
        footer={[
          <Button onClick={onCancel}>Cancelar</Button>,
          <Button
            type='primary'
            onClick={form.submit}
            disabled={modalLoading}
            loading={formLoading}
          >
            Salvar <SaveOutlined />
          </Button>
        ]}
      >
        <Skeleton
          loading={modalLoading}
        >
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ xs: { span: 7 }, md: { span: 7 } }}
            style={{ marginTop: 24 }}
            validateMessages={{
              required: '${alias} é obrigatório!',
              string: {
                min: '${alias} deve ter no mínimo 3 caracteres!'
              },
            }}
          >

            <Form.Item
              label='Data Conclusão'
              name='date_conclusion'
              messageVariables={{ alias: 'Data conclusão' }}
              rules={[{ required: true }]}
              {...formErrors.date_conclusion && getFormatedFormErrors('date_conclusion')}
              hasFeedback
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label='Responsável'
              name='responsible_id'
              messageVariables={{ alias: 'Responsável' }}
              rules={[{ required: true }]}
              {...formErrors.responsible_id && getFormatedFormErrors('responsible_id')}
              hasFeedback
            >
              <DebounceSelect
                value={searchedValue}
                fieldNames={{ label: 'email', value: 'id' }}
                placeholder="email do responsável"
                fetchOptions={fetchUserList}
                onChange={setSearchedValue}
                defaultOptions={selectDefaultOptions}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label='Descrição'
              name='description'
              messageVariables={{ alias: 'Descrição' }}
              rules={[{ required: true, min: 3 }]}
              {...formErrors.description && getFormatedFormErrors('description')}
              hasFeedback
            >
              <TextArea />
            </Form.Item>
          </Form>
        </Skeleton>
      </Modal>
    </div>
  )
}

export default ScreenTaskEdit