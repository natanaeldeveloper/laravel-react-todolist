import { Button, Modal, message } from "antd"
import { useNavigate } from "react-router-dom"

import api from "../../services/api"
import { getID, removeID, removeToken } from "../../services/auth"

const ScreenUserDelete = () => {
  const navigate = useNavigate()
  const userId = getID()
  const [messageApi, contextHolder] = message.useMessage()

  const onCancel = () => {
    navigate('/dashboard/profile')
  }

  const deleteUser = () => {
    api.delete(`users/${userId}`)
      .then(res => res.data)
      .then(res => {
        removeID()
        removeToken()
        navigate('/', {
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
            content: error.message
          })
        }
      })
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={true}
        onCancel={onCancel}
        title='Leia com atenção'
        footer={[
          <Button key={1} onClick={onCancel}>Cancelar</Button>,
          <Button key={2} style={{ color: 'red' }} onClick={deleteUser}>Desejo excluir mesmo assim</Button>
        ]}
      >
        <p>Esta ação excluirá todos os seus dados pessoais inclusive tarefas vinculadas a sua conta.</p>
      </Modal>
    </>
  )
}

export default ScreenUserDelete