import { useGetRightQuery, useUpdateRightMutation } from '@/store/api/roleAPI';
import { roleData } from '@/store/api/roleAPI/types';
import { Modal, Tree } from 'antd';
import React, { useEffect, useState } from 'react';

interface treeModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roleTreeData: roleData[];
  roleID: number;
}

const RoleTree: React.FC<treeModal> = (props) => {
  // #region 获取全部权限列表
  const [treeData, setTreeData] = useState<any[]>([]);
  const { data, isSuccess } = useGetRightQuery({ type: 'tree' });
  useEffect(() => {
    if (isSuccess) {
      setTreeData(data.data);
    }
  }, [isSuccess]);
  // #endregion

  // #region 设置所选
  const [checkedKeys, setCheckedKeys] = useState({ checked: [] as number[], halfChecked: [] });
  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };
  let checkedArray: number[] = [];
  // 遍历 children 设置勾选项
  const getCheckID = (children: any) => {
    if (!children) return;
    children.forEach((item: any) => {
      if (!item.children) {
        checkedArray.push(item.id);
      } else {
        checkedArray.push(item.id);
        getCheckID(item.children);
      }
    });
    setCheckedKeys((prevState) => ({ ...prevState, checked: checkedArray }));
  };
  useEffect(() => {
    getCheckID(props.roleTreeData[0]?.children);
  }, [props.roleTreeData]);

  // #endregion
  const [updateFn, { isLoading }] = useUpdateRightMutation();

  const handleOk = async () => {
    try {
      const res = await updateFn({ roleId: props.roleID, rids: checkedKeys.checked });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="修改权限"
      open={props.open}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={() => {
        props.setOpen(false);
        setCheckedKeys((prevState) => ({ ...prevState, checked: [] }));
      }}
    >
      <Tree
        checkable
        checkStrictly
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={treeData}
        fieldNames={{ title: 'authName', key: 'id' }}
        defaultExpandAll
      />
    </Modal>
  );
};

export default RoleTree;
