import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './App.tsx'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/locale/pt_BR'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
)
