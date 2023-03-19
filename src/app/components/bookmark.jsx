/* eslint-disable react/prop-types */
import React from 'react';

const Bookmark = ({ status, _id, onHandleToggleBookMark }) => {
  return (
    <td>
      <button
        onClick={() => onHandleToggleBookMark(_id)}
        className={'bi bi-bookmark-star' + (status ? '-fill' : '')}
      ></button>
    </td>
  );
};

export default Bookmark;
