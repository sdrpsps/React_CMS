import { useAddUserMutation } from '@/store/api/userAPI';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react';

interface UserData {
  onSuccess: () => void;
}

const UserAddModal: React.FC<UserData> = (props) => {
  // 全局提示
  const [messageApi, contextHolder] = message.useMessage();
  const [addForm] = Form.useForm();
  const [open, setOpen] = useState(false);

  // 导入新增用户钩子
  const [addFn, { isLoading }] = useAddUserMutation();
  // 点击确认
  const handleOk = async () => {
    // 获取当前表单数据并提交
    try {
      const res = await addFn(addForm.getFieldsValue()).unwrap();
      if (res.meta.status !== 201) {
        throw new Error(res.meta.msg);
      }
      // 清除已填数据
      addForm.resetFields();
      setOpen(false);
      // 重新渲染表格
      props.onSuccess();
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
      <Button type="primary" icon={<UserAddOutlined />} onClick={() => setOpen(true)}>
        添加用户
      </Button>
      <Modal title="修改用户" open={open} onOk={handleOk} confirmLoading={isLoading} onCancel={() => setOpen(false)}>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={addForm} autoComplete="off">
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请填写用户名' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请填写密码' }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="手机号" name="mobile">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserAddModal;
