import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetUserListQuery } from '@/store/api/userAPI';
import { User } from '@/store/api/userAPI/types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const columns: ColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" icon={<EditOutlined />} />
        <Button danger type="primary" icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const UserTable: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const { data: userData, isSuccess } = useGetUserListQuery({});
  useEffect(() => {
    if (isSuccess) {
      setData(userData.data.users);
    }
  }, [userData, isSuccess]);

  return <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />;
};

export default UserTable;
