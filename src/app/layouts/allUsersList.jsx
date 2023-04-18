/* eslint-disable react/prop-types */
import React from 'react';
import SelectedUser from '../components/selectedUser';
import Users from '../components/users';
import { useParams } from 'react-router-dom';

const AllUsersList = () => {
  const params = useParams();
  const { userID } = params;

  return <>{userID ? <SelectedUser userID={userID} /> : <Users />}</>;
};

export default AllUsersList;
