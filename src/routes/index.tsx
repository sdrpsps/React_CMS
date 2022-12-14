import DashboardContent from '@/components/Dashboard/DashboardContent/DashboardContent';
import NeedAuth from '@/components/NeedAuth/NeedAuth';
import Dashboard from '@/pages/Dashboard/Dashboard';
import LoginPage from '@/pages/LoginPage/LoginPage';
import { RouteObject } from 'react-router-dom';
// 加载组件
import { Spin } from 'antd';
// 懒加载
import { lazy, ReactNode, Suspense } from 'react';
const UserList = lazy(() => import('@/components/Dashboard/User/UserList'));
const RoleList = lazy(() => import('@/components/Dashboard/Role/RoleList'));
const PermissionList = lazy(() => import('@/components/Dashboard/Role/PermissionList'));

const lazyLoad = (children: ReactNode) => {
  return <Suspense fallback={<Spin />}>{children}</Suspense>;
};

const route: RouteObject[] = [
  {
    path: '/',
    element: (
      <NeedAuth>
        <Dashboard />
      </NeedAuth>
    ),
    children: [
      /* 主页第一屏内容 */
      { index: true, element: <DashboardContent /> },
      { path: 'user/list', element: lazyLoad(<UserList />) },
      { path: 'role/roleList', element: lazyLoad(<RoleList />) },
      { path: 'role/permissionList', element: lazyLoad(<PermissionList />) },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];

export default route;
