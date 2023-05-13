import React from 'react';
import { useParams } from 'react-router-dom';
import EditUserPage from '../components/page/editUserPage/editUserPage';
import UserPage from '../components/page/userPage';

const UserEdit = () => {
  const params = useParams();
  const { userId } = params;

  return <>{userId ? <EditUserPage userId={userId} /> : <UserPage userId={userId} />}</>;
};

export default UserEdit;
