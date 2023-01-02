import {Form, Input, message, Modal} from 'antd';
import React, {useEffect} from 'react';
import {useUpdateRoleMutation} from "@/store/api/roleAPI";
import {roleData} from "@/store/api/roleAPI/types";

interface data {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    roleData: roleData;
    onSuccess: () => void;
}

const RoleUpdateModal: React.FC<data> = (props) => {
    // 全局提示
    const [messageApi, contextHolder] = message.useMessage();
    const [roleForm] = Form.useForm();

    // #region 修改角色
    const [updateRoleFn, {isLoading}] = useUpdateRoleMutation();
    // 写入父组件传来的数据到表单中
    useEffect(() => {
        roleForm.setFieldsValue(props.roleData);
    }, [props.open]);
    // 点击确认
    const handleOk = async () => {
        // 获取当前表单数据并提交
        try {
            const res = await updateRoleFn({id: props.roleData.id,data:roleForm.getFieldsValue()}).unwrap();
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
                title="修改角色"
                open={props.open}
                onOk={handleOk}
                confirmLoading={isLoading}
                onCancel={() => props.setOpen(false)}
                // 强制模态框渲染
                forceRender
            >
                <Form labelCol={{span: 4}} wrapperCol={{span: 16}} form={roleForm} autoComplete="off">
                    <Form.Item label="角色名称" name="roleName" rules={[{required: true}]}>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="角色描述" name="roleDesc">
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RoleUpdateModal;
