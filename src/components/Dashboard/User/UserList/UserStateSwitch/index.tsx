import { useUpdateUserStateMutation } from '@/store/api/userAPI';
import { User } from '@/store/api/userAPI/types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import React, { useState } from 'react';

interface userData {
  userState: boolean;
  record: User;
  setData: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserStateSwitch: React.FC<userData> = (props) => {
  // 修改用户状态
  const [updateStateFn, { isLoading: updateStateLoading }] = useUpdateUserStateMutation();
  /* 记录当前修改的用户 ID 用于判断开关的 Loading 状态 */
  const [requestID, setRequestID] = useState(0);
  const onSwitch = (checked: boolean, id: number) => {
    setRequestID(id); // 设置当前用户 ID
    props.setData((prev) => prev.map((item) => (item.id === id ? { ...item, mg_state: checked } : item))); // 修改用户状态
    updateStateFn({ id, type: checked });
  };
  return (
    <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      checked={props.userState}
      onClick={(checked) => onSwitch(checked, props.record.id)}
      loading={requestID === props.record.id ? updateStateLoading : false}
    />
  );
};

export default UserStateSwitch;
