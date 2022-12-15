import { useDeleteUserInfoMutation } from '@/store/api/userAPI';
import { User } from '@/store/api/userAPI/types';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useState } from 'react';

interface UserData {
  record: User;
  onUpdateSuccess: () => void;
}

const UserDeletePop: React.FC<UserData> = (props) => {
  // 全局提示
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  // 导入更新用户信息钩子
  const [deleteFn, { isLoading }] = useDeleteUserInfoMutation();
  // 点击确认
  const confirm = async () => {
    // 获取当前表单数据并提交
    try {
      const res = await deleteFn({ id: props.record.id }).unwrap();
      if (res.meta.status !== 200) {
        throw new Error(res.meta.msg);
      }
      setOpen(false);
      // 重新渲染表格
      props.onUpdateSuccess();
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error.toString(),
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Popconfirm
        title="确定删除用户吗?"
        open={open}
        onConfirm={confirm}
        okButtonProps={{ loading: isLoading }}
        okText="Yes"
        cancelText="No"
      >
        <Button danger type="primary" icon={<DeleteOutlined />} onClick={() => setOpen(true)} />
      </Popconfirm>
    </>
  );
};

export default UserDeletePop;
