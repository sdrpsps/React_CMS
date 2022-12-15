import React from 'react';
import UserSearch from './UserSearch';
import UserTable from './UserTable';

const UserList: React.FC = () => {
  return (
    <div>
      <UserSearch />
      <UserTable />
    </div>
  );
};

export default UserList;
