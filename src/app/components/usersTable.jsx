import React from 'react';
import PropTypes from 'prop-types';
import BookMark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UserTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  onDelete,
  onHeaderIcon,
  onHandleIconChange,
}) => {
  const columns = {
    name: { path: 'name', name: 'Имя', icon: '' },

    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    professions: { path: 'profession.name', name: 'Профессия', icon: '' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз', icon: '' },
    rate: { path: 'rate', name: 'Оценка', icon: '' },
    bookMark: {
      path: 'bookmark',
      name: 'Избранное',
      icon: '',
      component: (user) => (
        <BookMark status={user.bookmark} onClick={() => onToggleBookMark(user._id)} />
      ),
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className='btn btn-danger'>
          delete
        </button>
      ),
    },
  };

  return (
    // <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}>
    //   <TableHeader {...{ onSort, selectedSort, columns }} />
    //   <TableBody {...{ columns, data: users }} />
    // </Table>
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
      onHeaderIcon={onHeaderIcon}
      onHandleIconChange={onHandleIconChange}
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onHandleIconChange: PropTypes.func.isRequired,
  onHeaderIcon: PropTypes.object.isRequired,
};

export default UserTable;
