import React from 'react';
import { Input, Button } from 'antd';
import styles from './index.module.scss';
const { Search } = Input;

interface searchQuery {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  getListLoading: boolean;
}

const UserSearch: React.FC<searchQuery> = (props) => {
  const onSearch = (value: string) => {
    props.setPageNum(1);
    props.setQuery(value);
  };
  return (
    <Search
      className="search"
      placeholder="请输入要搜索的用户名"
      onSearch={onSearch}
      loading={props.getListLoading}
      enterButton
    />
  );
};

export default UserSearch;
