import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validator } from '../../../utils/validator';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import api from '../../../api';
import PropTypes from 'prop-types';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';

const EditUserPage = ({ userId }) => {
  console.log(userId);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfession] = useState([]);
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    sex: '',
    qualities: [],
  });

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color,
          });
        }
      }
    }
    return qualitiesArray;
  };

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id,
      })),
    );

    const transformData = (data) => {
      return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };

    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => history.push(`/users/${data._id}`));
  };

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения',
      },
      isEmail: {
        message: 'Email введен некорректно',
      },
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя',
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label='Имя'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label='Электронная почта'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label='Выбери свою профессию'
                defaultOption='Выберете из списка'
                options={professions}
                name='profession'
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' },
                ]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
                label='Выберите ваш пол'
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name='qualities'
                label='Выберите ваши качества'
              />

              <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>
                Submit
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  );
};

EditUserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default EditUserPage;
