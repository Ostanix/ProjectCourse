import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import User from './user';
import api from '../api';
import GroupList from './groupList';
import SearchStatus from '../components/searchStatus';

const Users = ({ users, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 2;

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  console.log(selectedProf);
  users.map((user) => console.log(user.profession));

  function filterUsers(usersArrObj, selectedProf, professionsData) {
    const newUsersArray = [];
    if (Array.isArray(professionsData)) {
      usersArrObj.map((user) => {
        let userArrayProf = Object.values(user.profession);
        let selectedProfArr = Object.values(selectedProf);

        for (let i = 0; i < userArrayProf.length; i++) {
          let userArrayElement = userArrayProf[i];
          let selectedUserArrayElement = selectedProfArr[i];
          if (userArrayElement.includes(selectedUserArrayElement)) newUsersArray.push(user);
          return newUsersArray;
        }
      });
    } else {
      usersArrObj.map((user) => {
        for (const key in selectedProf) {
          let userArrayProf = Object.values(user.profession);
          let selectedProfArr = Object.values(selectedProf[key]);

          for (let i = 0; i < userArrayProf.length; i++) {
            let userArrayElement = userArrayProf[i];
            let selectedUserArrayElement = selectedProfArr[i];
            if (userArrayElement.includes(selectedUserArrayElement)) newUsersArray.push(user);
            return newUsersArray;
          }
        }
      });
    }
    return newUsersArray;
  }

  const filteredUsers = selectedProf ? filterUsers(users, selectedProf, professions) : users;

  const count = filteredUsers.length;

  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <div className='d-flex'>
      {professions && (
        <div className='d-flex flex-column flex-shrink-0 p-3'>
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className='btn btn-secondary mt-2' onClick={clearFilter}>
            Сброс
          </button>
        </div>
      )}

      <div className='d-flex flex-column'>
        <SearchStatus length={count} />
        {count > 0 && (
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Имя</th>
                <th scope='col'>Качества</th>
                <th scope='col'>Провфессия</th>
                <th scope='col'>Встретился, раз</th>
                <th scope='col'>Оценка</th>
                <th scope='col'>Избранное</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userCrop.map((user) => (
                <User {...rest} {...user} key={user._id} />
              ))}
            </tbody>
          </table>
        )}
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Users;
