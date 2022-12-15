import { useGetUserListMutation, useUpdateUserStateMutation } from '@/store/api/userAPI';
import { User } from '@/store/api/userAPI/types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { message, Space, Switch, Table } from 'antd';
import Column from 'antd/es/table/Column';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserDeletePop from './UserDeletePop';
import UserEditModal from './UserEditModal';

const UserTable: React.FC = () => {
  // 全局提示
  const [messageApi, contextHolder] = message.useMessage();
  // #region 获取表格
  // 用户列表
  const [data, setData] = useState<User[]>([]);
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 1, total: 3 });
  /* 获取表格数据 */
  const [getListFn, { isLoading: getListLoading }] = useGetUserListMutation();
  const getListHandler = async () => {
    try {
      const res = await getListFn({ query: '', pageNum: pagination.pageNum, pageSize: pagination.pageSize }).unwrap();
      if (res.meta.status !== 200) {
        throw new Error(res.meta.msg);
      }
      setData(res.data.users);
      // setPagination((prevState) => ({ ...prevState, total: res.data.total }));
      // setPagination({ ...pagination, total: 3 });
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error.toString(),
      });
    }
  };
  // 分页页码或页面大小改变时
  const onPaginationChange = (pageNum: number, pageSize: number) => {
    setPagination((prevState) => ({ ...prevState, pageNum, pageSize }));
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
      <Table
        dataSource={data}
        rowKey={(record) => record.id}
        loading={getListLoading}
        bordered
        pagination={{
          current: pagination.pageNum,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: onPaginationChange,
        }}
      >
        <Column title="ID" dataIndex="id" />
        <Column title="用户名" dataIndex="username" />
        <Column title="名称" dataIndex="role_name" />
        <Column title="邮箱" dataIndex="email" />
        <Column title="手机号" dataIndex="mobile" />
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
              <UserEditModal record={record} onSuccess={getListHandler} />
              <UserDeletePop record={record} onSuccess={getListHandler} />
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default UserTable;
