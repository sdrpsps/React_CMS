import { useGetUserListMutation } from '@/store/api/userAPI';
import { User } from '@/store/api/userAPI/types';
import { Space, Table, message } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';
import UserDeletePop from './UserDeletePop';
import UserEditModal from './UserEditModal';
import UserStateSwitch from './UserStateSwitch';
import UserSearch from './UserSearch';
import UserAddModal from './UserAddModal';
import styles from './index.module.scss';

const UserTable: React.FC = () => {
  // 全局提示
  const [messageApi, contextHolder] = message.useMessage();
  // #region 获取表格
  // 用户列表
  const [data, setData] = useState<User[]>([]);
  // 搜索框
  const [query, setQuery] = useState('');
  // 分页参数
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setToal] = useState(0);
  /* 获取表格数据 */
  const [getListFn, { isLoading: getListLoading }] = useGetUserListMutation();
  const getListHandler = async () => {
    try {
      const res = await getListFn({ query, pageNum, pageSize }).unwrap();
      if (res.meta.status !== 200) {
        throw new Error(res.meta.msg);
      }
      setData(res.data.users); // 设置数据
      setToal(res.data.total); // 设置总页数
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error.toString(),
      });
    }
  };
  // 分页页码或页面大小改变时
  const onPaginationChange = (pageNum: number, pageSize: number) => {
    setPageNum(pageNum); // 设置页码
    setPageSize(pageSize); // 设置页面大小
  };
  /* 设置表格，在第一次渲染组件时、关键词修改和分页修改时执行 */
  useEffect(() => {
    getListHandler();
  }, [query, pageNum, pageSize]);
  // #endregion

  return (
    <div className={styles.userList}>
      {contextHolder}
      {/* 顶部菜单 */}
      <div className="top">
        <UserSearch setQuery={setQuery} setPageNum={setPageNum} getListLoading={getListLoading} />
        <UserAddModal onSuccess={getListHandler} />
      </div>
      {/* 表格 */}
      <div className="content">
        <Table
          dataSource={data}
          rowKey={(record) => record.id}
          loading={getListLoading}
          bordered
          pagination={{
            current: pageNum,
            pageSize,
            total,
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
            render={(userState, record: User) => (
              <Space size="middle">
                <UserStateSwitch userState={userState} record={record} setData={setData} />
              </Space>
            )}
          />
          <Column
            title="操作"
            render={(_, record: User) => (
              <Space size="middle">
                <UserEditModal record={record} onSuccess={getListHandler} key={Math.random()} />
                <UserDeletePop record={record} onSuccess={getListHandler} />
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
