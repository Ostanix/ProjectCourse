import React from 'react';

const SearchStatus = (props) => {
  return (
    <h2>
      <span className={'badge ' + (props.length > 0 ? 'bg-primary' : 'bg-danger')}>
        {length > 0
          ? `${length + ' ' + props.onRenderPhrase(props.length)} с тобой сегодня`
          : 'Никто с тобой не тусанет'}
      </span>
    </h2>
  );
};

export default SearchStatus;
