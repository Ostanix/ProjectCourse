/* eslint-disable react/prop-types */
import React from 'react';

const SearchBar = ({ onHandleChange, name }) => {
  return (
    <form className='input-group mb-3'>
      <input
        onChange={onHandleChange}
        value={name}
        className='form-control'
        placeholder='Введите имя...'
        aria-label=''
        aria-describedby='basic-addon1'
      />
    </form>
  );
};

export default SearchBar; // ТЗ 1
