import {useDeleteRoleMutation} from '@/store/api/roleAPI';
import {DeleteOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm} from 'antd';
import React, {useState} from 'react';
import {roleData} from "@/store/api/roleAPI/types";

interface data {
    record: roleData;
    onSuccess: () => void;
}

const RoleDeletePop: React.FC<data> = (props) => {
    // 全局提示
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    // 导入更新用户信息钩子
    const [deleteFn, {isLoading}] = useDeleteRoleMutation();
    // 点击确认
    const confirm = async () => {
        // 获取当前表单数据并提交
        try {
            const res = await deleteFn({id: props.record.id}).unwrap();
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
            <Popconfirm
                title="确定删除角色吗?"
                open={open}
                onConfirm={confirm}
                onCancel={() => setOpen(false)}
                okButtonProps={{loading: isLoading}}
                okText="Yes"
                cancelText="No"
            >
                <Button danger type="primary" icon={<DeleteOutlined/>} onClick={() => setOpen(true)}/>
            </Popconfirm>
        </>
    );
};

export default RoleDeletePop;
