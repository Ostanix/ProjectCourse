import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const formatHeaderColor = () => {
    let classesColor = 'badge ';
    classesColor += users.length === 0 ? 'bg-danger' : 'bg-primary';
    return classesColor;
  };

  const wordEndings = () => {
    let wordEnd = 2 <= users.length && users.length <= 4 ? 'а' : '';
    return wordEnd;
  };

  const formatHeaderText = () => {
    let classesText =
      users.length > 0
        ? `${users.length} человек${wordEndings()} тусанут с тобой сегодня`
        : 'Никто с тобой не тусанет';
    return classesText;
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const qualityClassColor = (classColor) => {
    let classes = `badge bg-${classColor}`;
    return classes;
  };

  const renderTabString = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((qualitie) => (
            <span
              key={user._id}
              className={qualityClassColor(qualitie.color)}
              style={{ margin: '3px' }}
            >
              {qualitie.name}
            </span>
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button key={user._id} className='badge bg-danger' onClick={() => handleDelete(user._id)}>
            delete
          </button>
        </td>
      </tr>
    ));
  };

  const renderTab = () => {
    if (users.length !== 0) {
      return (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Имя</th>
              <th scope='col'>Качества</th>
              <th scope='col'>Профессия</th>
              <th scope='col'>Встретился</th>
              <th scope='col'>Оценка</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>{renderTabString()}</tbody>
        </table>
      );
    }
  };

  return (
    <>
      <h2>
        <span className={formatHeaderColor()}>{formatHeaderText()}</span>
      </h2>
      <div>{renderTab()}</div>
    </>
  );
};

export default Users;
