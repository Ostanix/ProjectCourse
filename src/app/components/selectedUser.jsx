/* eslint-disable react/prop-types */
import React from 'react';
import api from '../api';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import QualitiesList from './qualitiesList';

const SelectedUser = ({ userID }) => {
  const history = useHistory();
  const [user, setUserObj] = useState();
  const handleClick = () => {
    history.push('/users');
  };

  useEffect(() => {
    api.users.getById(userID).then((data) => setUserObj(data));
  });

  if (user) {
    return (
      <div>
        <h1> {user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleClick}> Все Пользователи</button>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default SelectedUser;
