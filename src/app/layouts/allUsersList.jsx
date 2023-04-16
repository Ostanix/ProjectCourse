/* eslint-disable react/prop-types */
import React from 'react';
import SelectedUser from './selectedUser';
import Users from '../components/users';
import api from '../api';

const AllUsersList = ({ match }) => {
  const userID = match.params.userID;

  const getData = async (usersID) => {
    const data = await api.users.getById(usersID);
    return data;
  };
  const objUser = getData(userID);

  return userID ? <SelectedUser data={objUser} /> : <Users />;
};

export default AllUsersList;
