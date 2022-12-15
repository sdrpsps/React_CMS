import React from 'react';
import { Input, Button } from 'antd';
import styles from './index.module.scss';
const { Search } = Input;

const UserSearch: React.FC = (props) => {
  const onSearch = (value: string) => {
    // props.getListFn({ query: value });
  };
  return (
    <div className={styles.userSearch}>
      <Search
        className="search"
        placeholder="请输入要搜索的用户名"
        onSearch={onSearch}
        // loading={props.getListLoading}
        enterButton
      />
      <Button type="primary">添加用户</Button>
    </div>
  );
};

export default UserSearch;
