import React, { useEffect, useState } from 'react';
import api from '../../../api';
import PropTypes from 'prop-types';

const EditUserPage = ({ userId }) => {
  const [user, setUser] = useState();
  console.log(user);
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  return <h1>111</h1>;
};

EditUserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default EditUserPage;
