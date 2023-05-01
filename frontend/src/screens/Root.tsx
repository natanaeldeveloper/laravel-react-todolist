import { useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom"
import { message } from "antd"

import Navbar from "../components/Navbar"

const Root = () => {

  const { state } = useLocation()
  const [messageApi, contextHolder] = message.useMessage()

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
  }, [])

  return (
    <div style={{ display: 'flex', flexFlow: 'row row' }}>
      {contextHolder}
      <div style={{ minWidth: 230 }}>
        <Navbar />
      </div>
      <div style={{ overflow: 'auto', width: '100%'}}>
        <Outlet />
      </div>
    </div>
  )
}

export default Root