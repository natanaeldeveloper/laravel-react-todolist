import { useState, useEffect } from 'react'
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space, message } from "antd"
import { Link, useLoaderData } from 'react-router-dom'
import { SaveOutlined } from '@ant-design/icons'

const { TextArea } = Input

const ScreenTaskEdit = () => {

  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const task = useLoaderData()

  useEffect(() => {
    console.log(task)
  }, [])

  return (
    <>
      {contextHolder}
      <Row justify={'center'}>
        <Col md={{ span: 16 }} span={24}>
          <Card
            title='Editar tarefa'
          >
            <Form
              form={form}
              labelCol={{ xs: { span: 7 }, md: { span: 7 } }}
            >
              <Form.Item
                label='Descrição'
                name='description'
              >
                <TextArea />
              </Form.Item>

              <Form.Item
                label='Data Conclusão'
                name='date_conclusion'
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label='Responsável'
                name='responsible_id'
              >
                <Select
                />
              </Form.Item>

              <Row justify={'end'}>
                <Space>
                  <Form.Item>
                    <Button><Link to={'/dashboard/tasks'}>Voltar</Link></Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary'>Salvar <SaveOutlined /></Button>
                  </Form.Item>
                </Space>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ScreenTaskEdit