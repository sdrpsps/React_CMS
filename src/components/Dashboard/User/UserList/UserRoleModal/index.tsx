import { useGetRoleListMutation, useUpdateUserRoleMutation } from '@/store/api/userAPI';
import { User } from '@/store/api/userAPI/types';
import { Form, Modal, Select, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';

interface userData {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User;
  onSuccess: () => void;
}

const UserRoleModal: React.FC<userData> = (props) => {
  // 全局提示
  const [messageApi, contextHolder] = message.useMessage();
  const [roleForm] = Form.useForm();
  // #region 获取角色列表
  const [options, setOptions] = useState<any[]>([]);
  const [getRoleListFn] = useGetRoleListMutation();
  /* 获取 */
  const getRoleListHandler = async () => {
    try {
      const res = await getRoleListFn('').unwrap();
      setOptions(res.data);
      if (res.meta.status !== 200) {
        throw new Error(res.meta.msg);
      }
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error.toString(),
      });
    }
  };
  useEffect(() => {
    getRoleListHandler();
  }, []);
  // 写入默认值
  useEffect(() => {
    roleForm.setFieldsValue(props.userData);
  }, [props.open]);
  // #endregion
  
  // #region 修改角色
  const [updateRoleFn, { isLoading }] = useUpdateUserRoleMutation();
  // 点击确认
  const handleOk = async () => {
    // 获取当前表单数据并提交
    try {
      const res = await updateRoleFn({ id: props.userData.id, rid: roleForm.getFieldsValue().role_name }).unwrap();
      if (res.meta.status !== 200) {
        throw new Error(res.meta.msg);
      }
      props.setOpen(false);
      // 重新渲染表格
      props.onSuccess();
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error.toString(),
      });
    }
  };
  // #endregion

  return (
    <>
      {contextHolder}
      <Modal
        title="修改用户"
        open={props.open}
        onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={() => props.setOpen(false)}
        // 强制模态框渲染
        forceRender
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={roleForm} autoComplete="off">
          <Form.Item label="用户名">
            <Tag color="magenta">{props.userData?.username}</Tag>
          </Form.Item>
          <Form.Item label="请选择角色" name="role_name">
            <Select style={{ width: 120 }} options={options} fieldNames={{ label: 'roleName', value: 'id' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserRoleModal;
