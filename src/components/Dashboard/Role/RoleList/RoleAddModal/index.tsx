import {UserAddOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, message} from 'antd';
import React, {useState} from 'react';
import {useAddRoleMutation} from "@/store/api/roleAPI";

interface userData {
    onSuccess: () => void;
}

const UserAddModal: React.FC<userData> = (props) => {
    // 全局提示
    const [messageApi, contextHolder] = message.useMessage();
    const [addForm] = Form.useForm();
    const [open, setOpen] = useState(false);

    // 导入新增用户钩子
    const [addFn, {isLoading}] = useAddRoleMutation();
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
            <Button type="primary" icon={<UserAddOutlined/>} onClick={() => setOpen(true)}>
                添加角色
            </Button>
            <Modal title="添加角色" open={open} onOk={handleOk} confirmLoading={isLoading}
                   onCancel={() => setOpen(false)}>
                <Form labelCol={{span: 4}} wrapperCol={{span: 16}} form={addForm} autoComplete="off">
                    <Form.Item label="角色名称" name="roleName" rules={[{required: true, message: '请填写角色名称'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="角色描述" name="roleDesc">
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserAddModal;
