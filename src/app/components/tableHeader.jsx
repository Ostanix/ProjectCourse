import React from 'react';
import Proptypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns, onHeaderIcon, onHandleIconChange }) => {
  const handleSort = (item, name) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
      });
      onHandleIconChange({
        ...onHeaderIcon,
        icon:
          onHeaderIcon.icon === 'bi bi-caret-down-fill'
            ? 'bi bi-caret-up-fill'
            : 'bi bi-caret-down-fill',
      });
    } else {
      onSort({ path: item, order: 'asc' });
      onHandleIconChange({ iconName: name, icon: 'bi bi-caret-up-fill' });
    }
  };

  const handleIconsClass = (columnName) => {
    if (columnName === onHeaderIcon.iconName) {
      return onHeaderIcon.icon;
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path, columns[column].name)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope='col'
          >
            <i className={handleIconsClass(columns[column].name)}>{columns[column].name}</i>
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: Proptypes.func.isRequired,
  selectedSort: Proptypes.object.isRequired,
  columns: Proptypes.object.isRequired,
  onHandleIconChange: Proptypes.func.isRequired,
  onHeaderIcon: Proptypes.object.isRequired,
};

export default TableHeader;
