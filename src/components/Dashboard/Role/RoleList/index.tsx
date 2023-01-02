import {useGetRoleListMutation} from '@/store/api/userAPI';
import {EditOutlined, IdcardOutlined} from '@ant-design/icons';
import {Button, message, Space, Table} from 'antd';
import Column from 'antd/es/table/Column';
import React, {useEffect, useState} from 'react';
import RoleTreeModal from './RoleTreeModal';
import {roleData} from '@/store/api/roleAPI/types';
import RoleAddModal from "@/components/Dashboard/Role/RoleList/RoleAddModal";
import styles from './index.module.scss'
import RoleDeletePop from "@/components/Dashboard/Role/RoleList/RoleDeletePop";
import RoleUpdateModal from "@/components/Dashboard/Role/RoleList/RoleUpdateModal";

const RoleList: React.FC = () => {
    // 全局提示
    const [messageApi, contextHolder] = message.useMessage();
    // #region 获取角色列表
    const [roleList, setRoleList] = useState<any[]>([]);
    const [tree, setTree] = useState<roleData[]>([]);
    const [getRoleListFn, {isLoading}] = useGetRoleListMutation();
    /* 获取 */
    const getRoleListHandler = async () => {
        try {
            const res = await getRoleListFn('').unwrap();
            const newR = JSON.parse(JSON.stringify(res.data));
            setTree(res.data);
            setRoleList(
                newR.map((item: any) => {
                    if (item['children'].length >= 0) {
                        delete item['children'];
                    }
                    return item;
                }),
            );

            if (res.meta.status !== 200) {
                throw new Error(res.meta.msg);
            }
        } catch (error: any) {
            console.log(error);

            messageApi.open({
                type: 'error',
                content: error.toString(),
            });
        }
    };
    useEffect(() => {
        getRoleListHandler();
    }, []);

    // #endregion
    // 模态框显示状态
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    // 当前选中的角色ID
    const [roleID, setRoleID] = useState(0);
    const [roleTreeData, setRoleTreeData] = useState<roleData[]>([]);

    useEffect(() => {
        setRoleTreeData(tree.filter((item) => item.id === roleID));
    }, [roleID]);
    return (
        <div className={styles.roleList}>
            {contextHolder}
            <div className="top">
                <RoleAddModal onSuccess={getRoleListHandler}/>
            </div>
            <div className="content">
                <Table dataSource={roleList} rowKey={(record) => record.id} loading={isLoading}>
                    <Column title="ID" dataIndex="id"/>
                    <Column title="角色名称" dataIndex="roleName"/>
                    <Column title="角色描述" dataIndex="roleDesc"/>
                    <Column
                        title="操作"
                        render={(_, record: roleData) => (
                            <Space size="middle">
                                <Button
                                    type="primary"
                                    icon={<EditOutlined/>}
                                    onClick={() => {
                                        setModalOpen(true);
                                        setRoleID(record.id);
                                    }}
                                />
                                <Button
                                    type="primary"
                                    icon={<IdcardOutlined />}
                                    onClick={() => {
                                        setModalUpdateOpen(true);
                                        setRoleID(record.id);
                                    }}
                                />
                                <RoleDeletePop record={record} onSuccess={getRoleListHandler}/>
                            </Space>
                        )}
                    />
                </Table>
            </div>
            <div className="modal">
                <RoleTreeModal open={modalOpen} setOpen={setModalOpen} roleTreeData={roleTreeData} roleID={roleID}/>
                 <RoleUpdateModal
                    open={modalUpdateOpen}
                    setOpen={setModalUpdateOpen}
                    roleData={roleList.filter((item) => item.id === roleID)[0]}
                    onSuccess={getRoleListHandler}
                />
            </div>
        </div>
    );
};

export default RoleList;
