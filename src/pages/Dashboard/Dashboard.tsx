import { VideoCameraOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'user',
    icon: <VideoCameraOutlined />,
    children: [
      {
        key: '/user/list',
        label: '用户列表',
      },
    ],
    label: '用户管理',
  },
  {
    key: 'role',
    icon: <VideoCameraOutlined />,
    children: [
      {
        key: '/role/roleList',
        label: '角色列表',
      },
      {
        key: '/role/permissionList',
        label: '权限列表',
      },
    ],
    label: '权限管理',
  },
];

const Dashboard: React.FC = () => {
  // 跳转
  const navigate = useNavigate();
  const onMenuClick = ({ key }: any) => {
    navigate(key);
  };
  // 菜单根据路由高亮
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div onClick={() => navigate('/')} style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={location.pathname.split('/')[1].split(' ')}
          selectedKeys={selectedKeys}
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, paddingLeft: 24, background: '#fff', display: 'flex', alignItems: 'center' }}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Application Center</Breadcrumb.Item>
            <Breadcrumb.Item>Application List</Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: '#fff' }}>
            {/* 动态显示路由组件 */}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
