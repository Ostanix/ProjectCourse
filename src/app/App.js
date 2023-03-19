import React, { useState } from 'react';
import SearchStatus from './components/searchStatus';
import api from './api';
import Users from './components/users';

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (Id) => {
    setUsers(
      users.map((user) => {
        if (user._id === Id) {
          if (user.bookmark) {
            user.bookmark = false;
          } else {
            user.bookmark = true;
          }
        }
        return user;
      }),
    );
  };

  return (
    <>
      <SearchStatus length={users.length} />

      {users.length > 0 && (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Имя</th>
              <th scope='col'>Качества</th>
              <th scope='col'>Профессия</th>
              <th scope='col'>Встретился, раз</th>
              <th scope='col'>Оценка</th>
              <th scope='col'>Избранное</th>
              <th />
            </tr>
          </thead>
          <Users
            users={users}
            onHandleDelete={handleDelete}
            onHandleToggleBookMark={handleToggleBookMark}
          />
        </table>
      )}
    </>
  );
}

export default App;
