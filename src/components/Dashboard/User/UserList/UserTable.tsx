import { useGetUserListMutation, useUpdateUserStateMutation } from '@/store/api/userAPI';
import { User } from '@/store/api/userAPI/types';
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Space, Switch, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';
import UserDeletePop from './UserDeletePop';
import UserEditModal from './UserEditModal';

const UserTable: React.FC = () => {
  // 全局提示
  const [messageApi, contextHolder] = message.useMessage();
  // #region 获取表格
  // 用户列表
  const [data, setData] = useState<User[]>([]);
  const [getListFn, { isLoading: getListLoading }] = useGetUserListMutation();
  /* 获取表格数据 */
  const getListHandler = async () => {
    try {
      const res = await getListFn({}).unwrap();
      if (res.meta.status !== 200) {
        throw new Error(res.meta.msg);
      }
      setData(res.data.users);
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error.toString(),
      });
    }
  };
  /* 设置表格，仅在第一次渲染组件时执行 */
  useEffect(() => {
    getListHandler();
  }, []);
  // #endregion

  /* 即将移到新组件中 */
  // 修改用户状态
  const [updateStateFn, { isLoading: updateStateLoading }] = useUpdateUserStateMutation();
  /* 记录当前修改的用户 ID 用于判断开关的 Loading 状态 */
  const [requestID, setRequestID] = useState(0);
  const onSwitch = (checked: boolean, id: number) => {
    setRequestID(id);
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, mg_state: checked } : item)));
    updateStateFn({ id, type: checked });
  };

  return (
    <>
      {contextHolder}
      <Table dataSource={data} rowKey={(record) => record.id} loading={getListLoading} bordered>
        <Column title="ID" dataIndex="id" />
        <Column title="用户名" dataIndex="username" />
        <Column title="名称" dataIndex="role_name" />
        <Column title="邮箱" dataIndex="email" />
        <Column
          title="是否启用"
          dataIndex="mg_state"
          render={(_, record: User) => (
            <Space size="middle">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={_}
                onClick={(checked) => onSwitch(checked, record.id)}
                loading={requestID === record.id ? updateStateLoading : false}
              />
            </Space>
          )}
        />
        <Column
          title="操作"
          render={(_, record: User) => (
            <Space size="middle">
              <UserEditModal record={record} onUpdateSuccess={getListHandler} />
              <UserDeletePop record={record} onUpdateSuccess={getListHandler} />
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default UserTable;
