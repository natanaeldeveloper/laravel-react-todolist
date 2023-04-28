import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { MenuProps, Menu } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  SettingOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

import AuthService from '../services/AuthService';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void,
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick
  } as MenuItem;
}

const App: React.FC = () => {

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const navigate = useNavigate()

  const logout = () => {
    AuthService.logout()
      .then(() => {
        navigate('/login')
      })
  }

  const items: MenuItem[] = [
    getItem('Tarefas', 'sub1', <UnorderedListOutlined />, [
      getItem('Lista de tarefas', '1', <SearchOutlined />, undefined, () => { navigate('tasks') }),
      getItem('Nova tarefa', '2', <PlusCircleOutlined />, undefined, () => { navigate('tasks/create') }),
    ]),
    getItem('Usuário', 'sub2', <UserOutlined />, [
      getItem('Lista de usuários', '3', <SearchOutlined />, undefined, () => { navigate('users') }),
      getItem('Editar Perfil', '4', <UserOutlined />, undefined, () => { navigate('profile') }),
    ]),
    getItem('Sair', 'sub3', <LogoutOutlined />, undefined, logout),
  ];

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={(keys) => setOpenKeys(keys)}
      style={{ width: 256, height: '100vh' }}
      items={items}
    />
  );
};

export default App;