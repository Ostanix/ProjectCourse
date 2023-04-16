/* eslint-disable react/prop-types */
import React from 'react';
import Quality from '../components/qualitie';

const SelectedUser = ({ data }) => {
  return (
    <ul>
      <li>{data.name}</li>
      <li>
        {data.qualities.map((qual) => (
          <Quality {...qual} key={qual._id} />
        ))}
      </li>
      <li>{data.profession.name}</li>
      <li>{data.completedMeetings}</li>
      <li>{data.rate}</li>
      <li>
        <button className='btn'>Все Пользователи</button>
      </li>
    </ul>
  );
};

export default SelectedUser;
