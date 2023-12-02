import styles from './RegisterForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';
import * as authAPI from '../../../../api/authAPI';
import useForm from '../../../../hooks/useForm';
import formRegisterInitialState from '../utils/formRegisterInitialState';


export default function RegisterForm() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [formValues, setFormValues] = useState(formRegisterInitialState);
  const [errors, setErrors] = useState({});
  const [hasServerError, setHasServerError] = useState(false);
  const [serverError, setServerError] = useState({});



  const resetFormHandler = () => {
    setFormValues(formRegisterInitialState);
    setErrors({});
  };

  const submitHandler = (values) => {

    authAPI.register(values)
      .then(user => {
        setAuth(user);
        navigate('/');
        console.log('sucsses');
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

  const usernameValidator = () => {
    if (values.username.length < 5) {
      setErrors(state => ({
        ...state,
        username: 'Потребителското име трябва да бъде минимум 5 символа',
      }));
    } else {
      if (errors.username) {
        setErrors(state => ({ ...state, username: '' }));
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


  const rePasswordValidator = () => {
    if (values.rePassword != values.password) {
      setErrors(state => ({
        ...state,
        rePassword: 'Трябва да е идентична с паролата',
      }));
    } else {
      if (errors.rePassword) {
        setErrors(state => ({ ...state, rePassword: '' }));
      }
    }
  };

  const { values, onChange, onSubmit } = useForm(submitHandler, formValues);


  return (
    <div className={styles.register}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.titlepage}>
              <h2>Регистрация</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 offset-md-1">


            <form id="request" method='POST' className={styles.main_form}
              onSubmit={onSubmit} >
              <div className="row">
                <div className="col-md-12 ">
                  <label htmlFor="username">Потребителско име:</label>
                  <input
                    className={styles.contactus}
                    type="type"
                    name="username"
                    id="username"
                    value={values.username}
                    onChange={onChange}
                    onBlur={usernameValidator}
                  />

                  {errors.email && (
                    <p className={styles.errorMessage}>{errors.username}</p>
                  )}
                </div>
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
                  <label htmlFor="phone">Мобилен номер:</label>
                  <input
                    className={styles.contactus}
                    type="type"
                    name="phone"
                    id="phone"
                    value={values.phone}
                    onChange={onChange}
                  />
                  {errors.phone && (
                    <p className={styles.errorMessage}>{errors.phone}</p>
                  )}
                </div>
                <div className="col-md-12">
                  <label htmlFor="password">Парола:</label>
                  <input
                    className={styles.contactus}
                    type="type"
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
                  <label htmlFor="rePassword">Повтори парола:</label>
                  <input
                    className={styles.contactus}
                    type="type"
                    name="rePassword"
                    id="rePassword"
                    value={values.rePassword}
                    onChange={onChange}
                    onBlur={rePasswordValidator}
                  />

                  {errors.rePassword && (
                    <p className={styles.errorMessage}>{errors.rePassword}</p>
                  )}
                </div>
                <div className="col-md-12">

                  <button className={styles.send_btn} type="submit"
                    disabled={(Object.values(errors).some(x => x)
                      || (Object.values(values).some(x => x == '')))}
                  >Регистрирай се</button>

                  {hasServerError && (
                    <p className={styles.serverError}>{serverError}</p>
                  )}

                  <div className={styles.go_to_profile}>
                    <p>Имаш профил?</p>
                    <Link className="nav-link" to="/login">Влез</Link>
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