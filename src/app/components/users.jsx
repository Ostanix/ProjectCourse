/* eslint-disable react/prop-types */
import React from 'react';
import User from './user';

const Users = ({ users, onHandleDelete, onHandleToggleBookMark }) => {
  return (
    <tbody>
      {users.map((user) => (
        <User
          user={user}
          key={user._id}
          onHandleDelete={onHandleDelete}
          onHandleToggleBookMark={onHandleToggleBookMark}
        />
      ))}
    </tbody>
  );
};

export default Users;
