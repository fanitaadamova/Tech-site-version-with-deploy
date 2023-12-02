import styles from './AddProduct.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as techniqueAPI from '../../../../api/techniqueAPI';
import useForm from '../../../../hooks/useForm';

import formInitialState from '../utils/initialFormValues';


export default function AddProduct() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(formInitialState);
    const [errors, setErrors] = useState({});
    const [hasServerError, setHasServerError] = useState(false);
    const [serverError, setServerError] = useState({});


    const resetFormHandler = () => {
        setFormValues(formInitialState);
        setErrors({});
    };

    const submitHandler = (values) => {

        techniqueAPI.create(values)
            .then(() => navigate('/catalog'))
            .catch(err => {
                console.log();
                setHasServerError(true);
                setServerError(err.message);
                console.log(err.message);
            });

        resetFormHandler();
    };

    const modelValidator = () => {
        if (values.model.length < 5) {
            setErrors(state => ({
                ...state,
                model: 'Модела трябва да бъде минимум 5 символа',
            }));
        } else {
            if (errors.model) {
                setErrors(state => ({ ...state, model: '' }));
            }
        }
    };

    const yearValidator = () => {
        if (Number(values.year) < 2000) {
            setErrors(state => ({
                ...state,
                year: 'Годината трябва да бъде число над 2000',
            }));
        } else {
            if (errors.year) {
                setErrors(state => ({ ...state, year: '' }));
            }
        }
    };

    const priceValidator = () => {
        if (Number(values.price) <= 0) {
            setErrors(state => ({
                ...state,
                price: 'Цената трябва да бъде число по-голяма от 0',
            }));
        } else {
            if (errors.price) {
                setErrors(state => ({ ...state, price: '' }));
            }
        }
    };

    const descriptionValidator = () => {
        if (values.description.length < 5) {
            setErrors(state => ({
                ...state,
                description: 'Описанието на продукта трябва да бъде минимум 5 символа',
            }));
        } else {
            if (errors.description) {
                setErrors(state => ({ ...state, description: '' }));
            }
        }
    };

    const osValidator = () => {
        if (values.os.length < 1) {
            setErrors(state => ({
                ...state,
                os: 'Полето е задължително',
            }));
        } else {
            if (errors.os) {
                setErrors(state => ({ ...state, os: '' }));
            }
        }
    };

    const imgValidator = () => {
        if (values.img.length < 1) {
            setErrors(state => ({
                ...state,
                img: 'Полето е задължително',
            }));
        } else {
            if (errors.img) {
                setErrors(state => ({ ...state, img: '' }));
            }
        }
    };


    const { values, onChange, onSubmit } = useForm(submitHandler, formValues);

    return (
        <div className={styles.product}>
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles.titlepage}>
                            <h2>Създай Оферта</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 offset-md-1">

                        <form id="request" className={styles.main_form}
                            onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <label className={styles.label} htmlFor="type">Избери тип:</label>
                                    <select className={styles.contactus}
                                        name="type" id="type" onChange={onChange} value={values.type}>
                                        <option value="Лаптоп">Лаптоп</option>
                                        <option value="Таблет">Таблет</option>
                                        <option value="Телефон">Телефон</option>
                                        <option value="Смарт часовник">Смарт часовник</option>
                                        <option value="Аксесоар">Аксесоар</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="model" className={styles.label}>Модел:</label>
                                    <input
                                        className={styles.contactus}
                                        type="text"
                                        name="model"
                                        id="model"
                                        value={values.model}
                                        onChange={onChange}
                                        onBlur={modelValidator}
                                    />

                                    {errors.model && (
                                        <p className={styles.errorMessage}>{errors.model}</p>
                                    )}
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="year" className={styles.label} >Година:</label>
                                    <input
                                        className={styles.contactus}
                                        type="number"
                                        name="year"
                                        id="year"
                                        value={values.year}
                                        onChange={onChange}
                                        onBlur={yearValidator}
                                    />

                                    {errors.year && (
                                        <p className={styles.errorMessage}>{errors.year}</p>
                                    )}
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="description" className={styles.label} >Описание:</label>
                                    <textarea
                                        className={styles.description}
                                        type="text"
                                        name="description"
                                        id="description"
                                        value={values.description}
                                        onChange={onChange}
                                        onBlur={descriptionValidator}
                                    />

                                    {errors.description && (
                                        <p className={styles.errorMessage}>{errors.description}</p>
                                    )}
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="price" className={styles.label} >Цена:</label>
                                    <input
                                        className={styles.contactus}
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={values.price}
                                        onChange={onChange}
                                        onBlur={priceValidator}
                                    />

                                    {errors.price && (
                                        <p className={styles.errorMessage}>{errors.price}</p>
                                    )}
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="img" className={styles.label} >Добави снимка:</label>
                                    <input
                                        className={styles.contactus}
                                        type="text"
                                        name="img"
                                        id="img"
                                        value={values.img}
                                        onChange={onChange}
                                        onBlur={imgValidator}
                                    />

                                    {errors.img && (
                                        <p className={styles.errorMessage}>{errors.img}</p>
                                    )}
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="os" className={styles.label} >Операционна система:</label>
                                    <input
                                        className={styles.contactus}
                                        type="text"
                                        name="os"
                                        id="os"
                                        value={values.os}
                                        onChange={onChange}
                                        onBlur={osValidator}
                                    />

                                    {errors.os && (
                                        <p className={styles.errorMessage}>{errors.os}</p>
                                    )}
                                </div>
                                <div className="col-md-12">
                                    <button className={styles.send_btn} type="submit"
                                        disabled={(Object.values(errors).some(x => x)
                                            || (Object.values(values).some(x => x == '')))}
                                    >Създай</button>
                                </div>

                                {hasServerError && (
                                    <p className={styles.serverError}>Нещо се обърка :( </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}