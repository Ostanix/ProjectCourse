import React from 'react';
import { useParams } from 'react-router-dom';
import EditUserPage from '../components/page/editUserPage/editUserPage';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
const Users = () => {
  const params = useParams();
  const { userId } = params;
  return (
    <>
      {userId ? (
        <UserPage userId={userId} />
      ) : <UsersListPage /> ? (
        <UsersListPage />
      ) : (
        <EditUserPage userId={userId} />
      )}
    </>
  );
};

export default Users;
