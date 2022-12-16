import { useUpdateUserInfoMutation } from '@/store/api/userAPI';
import { User } from '@/store/api/userAPI/types';
import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface UserData {
  record: User;
  onSuccess: () => void;
}

const UserEditModal: React.FC<UserData> = (props) => {
  // 全局提示
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);

  const [updateForm] = Form.useForm();
  // 写入父组件传来的数据到表单中
  useEffect(() => {
    updateForm.setFieldsValue(props.record);
  }, [updateForm]);
  // 导入更新用户信息钩子
  const [updateInfoFn, { isLoading }] = useUpdateUserInfoMutation();
  // 点击确认
  const handleOk = async () => {
    // 获取当前表单数据并提交
    try {
      const res = await updateInfoFn({ id: props.record.id, data: updateForm.getFieldsValue() }).unwrap();
      if (res.meta.status !== 200) {
        throw new Error(res.meta.msg);
      }
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
      <Button type="primary" icon={<EditOutlined />} onClick={() => setOpen(true)} />
      <Modal
        title="修改用户"
        open={open}
        onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={() => setOpen(false)}
        // 强制模态框渲染
        forceRender
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={updateForm} autoComplete="off">
          <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="mobile">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserEditModal;
