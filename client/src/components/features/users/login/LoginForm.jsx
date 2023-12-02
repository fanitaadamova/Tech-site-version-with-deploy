import styles from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import * as authAPI from '../../../../api/authAPI';
import { AuthContext } from '../../../../contexts/AuthContext';
import useForm from '../../../../hooks/useForm';

const formInitialState = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [formValues, setFormValues] = useState(formInitialState);
  const [errors, setErrors] = useState({});
  const [hasServerError, setHasServerError] = useState(false);
  const [serverError, setServerError] = useState({});


  const resetFormHandler = () => {
    setFormValues(formInitialState);
    setErrors({});
  };

  const submitHandler = (values) => {

    authAPI.login(values)
      .then(user => {
        setAuth(user);
        navigate('/');
      })
      .catch(error => {
        setHasServerError(true);
        setServerError(error.message);
      });

    resetFormHandler();
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const emailValidator = () => {
    if (!validateEmail(values.email)) {
      setErrors(state => ({
        ...state,
        email: 'Email адреса не е валиден формат',
      }));
    } else {
      if (errors.email) {
        setErrors(state => ({ ...state, email: '' }));
      }
    }
  };

  const passwordValidator = () => {
    if (values.password.length < 5) {
      setErrors(state => ({
        ...state,
        password: 'Паролата трябва да бъде минимум 5 символа',
      }));
    } else {
      if (errors.password) {
        setErrors(state => ({ ...state, password: '' }));
      }
    }
  };

  const { values, onChange, onSubmit } = useForm(submitHandler, formValues);

  return (
    <div className={styles.login}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.titlepage}>
              <h2> В Х О Д </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 offset-md-1">


            <form id="request" method='POST' className={styles.main_form}
              onSubmit={onSubmit} >

              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="email">E-mail адрес:</label>
                  <input
                    className={styles.contactus}
                    type="type"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={onChange}
                    onBlur={emailValidator}
                  />
                  {errors.email && (
                    <p className={styles.errorMessage}>{errors.email}</p>
                  )}
                </div>

                <div className="col-md-12">
                  <label htmlFor="password">Парола:</label>
                  <input
                    className={styles.contactus}
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={onChange}
                    onBlur={passwordValidator}
                  />

                  {errors.password && (
                    <p className={styles.errorMessage}>{errors.password}</p>
                  )}
                </div>

                <div className="col-md-12">
                  <button className={styles.send_btn} type="submit"
                    disabled={(Object.values(errors).some(x => x)
                      || (Object.values(values).some(x => x == '')))}
                  >Влез</button>

                  {hasServerError && (
                    <p className={styles.serverError}>{serverError}</p>
                  )}

                  <div className={styles.no_profile}>
                    <p>Нямаш профил?</p>
                    <Link className="nav-link" to="/register">Регистрация</Link>
                  </div>

                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}