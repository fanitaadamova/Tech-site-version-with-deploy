import styles from './EditProduct.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as techniqueAPI from '../../../../api/techniqueAPI';
import useForm from '../../../../hooks/useForm';
import Loader from '../../../shared/Loader';

import formInitialState from '../utils/initialFormValues';

export default function EditProduct() {
    const navigate = useNavigate();

    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [productInfo, setProductInfo] = useState(formInitialState);
    const [errors, setErrors] = useState({});
    const [hasServerError, setHasServerError] = useState(false);
    const [serverError, setServerError] = useState({});

    useEffect(() => {
        setIsLoading(true);

        techniqueAPI.getOne(productId)
            .then(result => setProductInfo(result))
            .catch(err => {
                console.log();
                setHasServerError(true);
                setServerError(err.message);
                console.log(err.message);
            })
            .finally(() => setIsLoading(false));

    }, [productId]);

    const submitHandler = (values) => {

        techniqueAPI.edit(productId, values)
            .then(() => navigate('/catalog'))
            .catch(err => {
                console.log();
                setHasServerError(true);
                setServerError(err.message);
                console.log(err.message);
            });

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


    const { values, onChange, onSubmit } = useForm(submitHandler, productInfo);

    return (
        <div className={styles.product}>
            <div>
                {isLoading && < Loader />}

                {hasServerError && (
                    <p className={styles.serverError}>Нещо се обърка :( </p>
                )}

                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.titlepage}>
                                <h2>Промяна на оферта</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">

                            <form id="request" method='POST' className={styles.main_form}
                                onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col-md-12 ">
                                        <label className={styles.label} htmlFor="type">Избери тип:</label>
                                        <select className={styles.contactus}
                                            name="type" id="type"
                                            onChange={onChange}
                                            value={values.type}>
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
                                            placeholder="Модел"
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
                                            placeholder="Година"
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
                                            placeholder="Описание"
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
                                            placeholder="Цена"
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
                                            placeholder="Операционна система"
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

                                        >Запази</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}