import { Card, Col, DatePicker, Form, Input, Row, message } from "antd"
import api from "../../services/api"
import DebounceSelect from "../../components/DebounceSelect"
import { useState } from "react"

const { TextArea } = Input

const ScreenTaskCreate = () => {

  const [messageApi, contextHolder] = message.useMessage()
  const [searchedValue, setSearchedValue] = useState<any>()


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
          content: error.response.data.message
        })
      })
  }

  return (
    <>
      {contextHolder}
      <Row justify={"center"}>
        <Col md={{ span: 16 }} span={24}>
          <Card
            title="Editar dados da tarefa"
          >
            <Form>
              <Form.Item
                label='Descrição'
                name='description'
              >
                <TextArea />
              </Form.Item>

              <Form.Item
                label='Data de conclusão'
                name='date_conclusion'
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label='Responsável'
                name='responsible_id'
              >
                <DebounceSelect
                  value={searchedValue}
                  fieldNames={{ label: 'email', value: 'id' }}
                  placeholder="Select users"
                  fetchOptions={fetchUserList}
                  onChange={setSearchedValue}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ScreenTaskCreate