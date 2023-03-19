/* eslint-disable react/prop-types */
import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';

const User = ({ user, onHandleDelete, onHandleToggleBookMark }) => {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((item) => (
          <Qualitie key={item._id} color={item.color} name={item.name} _id={item._id} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <BookMark
        status={user.bookmark}
        onHandleToggleBookMark={onHandleToggleBookMark}
        _id={user._id}
      />
      <td>
        <button onClick={() => onHandleDelete(user._id)} className='btn2 btn btn-danger'>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
