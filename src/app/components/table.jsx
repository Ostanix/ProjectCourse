/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({
  onSort,
  selectedSort,
  columns,
  data,
  children,
  onHeaderIcon,
  onHandleIconChange,
}) => {
  return (
    <table className='table'>
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns, onHeaderIcon, onHandleIconChange }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array,
};

export default Table;
