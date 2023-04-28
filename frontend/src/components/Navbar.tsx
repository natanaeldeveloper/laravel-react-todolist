import React, { useState } from 'react';
import { UserOutlined, LogoutOutlined, EditOutlined, UnorderedListOutlined, SearchOutlined, SettingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom'
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

const rootSubmenuKeys = ['sub2'];

const App: React.FC = () => {

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const navigate = useNavigate()

  const logout = () => {
    AuthService.logout()
      .then(resp => {
        navigate('/login')
      })
  }

  const items: MenuItem[] = [
    getItem('Tarefas', 'sub1', <UnorderedListOutlined />, [
      getItem('Nova', '1', <PlusCircleOutlined />),
      getItem('Consultar', '2', <SearchOutlined />),
    ]),
    getItem('Usuário', 'sub2', <UserOutlined />, [
      getItem('Perfil', '4', <UserOutlined />),
      getItem('Consultar', '3', <SearchOutlined />),
      getItem('Configurações', '5', <SettingOutlined />),
    ]),
    getItem('Sair', 'sub3', <LogoutOutlined />, undefined, logout),
  ];

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256, height: '100vh' }}
      items={items}
    />
  );
};

export default App;