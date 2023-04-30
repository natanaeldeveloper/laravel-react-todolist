import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { MenuProps, Menu } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { removeToken } from '../services/auth'
import api from '../services/api';

type MenuItem = Required<MenuProps>['items'][number]

const App = () => {

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const navigate = useNavigate()

  const logout = () => {
    api.post('auth/logout', {})
      .finally(() => {
        removeToken()
        navigate('/login')
      })
  }

  const items: MenuItem[] = [
    {
      label: 'Tarefas',
      key: 'sub1',
      icon: <UnorderedListOutlined />,
      children: [
        {
          label: 'Lista de tarefas',
          key: '1',
          icon: <SearchOutlined />,
          onClick() { navigate('tasks') }
        },
        {
          label: 'Nova tarefa',
          key: '2',
          icon: <PlusCircleOutlined />,
          onClick() { navigate('tasks/create') }
        }
      ]
    },
    {
      label: 'Usuário',
      key: 'sub2',
      icon: <UserOutlined />,
      children: [
        {
          label: 'Seus dados',
          key: '4',
          icon: <ProfileOutlined />,
          onClick() { navigate('profile') }
        }
      ]
    },
    {
      label: 'Sair',
      key: '5',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={(keys) => setOpenKeys(keys)}
        style={{ height: '100vh' }}
        items={items}
      />
    </>
  );
};

export default App;