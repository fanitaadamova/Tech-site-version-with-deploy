import styles from './Search.module.css';
import { useEffect, useState } from 'react';
import * as techniqueAPI from '../../../../api/techniqueAPI';

import Product from '../product/Product';
import Loader from '../../../shared/Loader';

const initialValue = {
    search: '',
};


export default function Search() {
    const [technique, setTechnique] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState(initialValue);

    useEffect(() => {
        setIsLoading(true);
        techniqueAPI.getAll()
            .then(result => setTechnique(result.filter(product => product.model
                .toLowerCase()
                .includes(searchValue.search.toLowerCase()))))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));

    }, [searchValue]);

    const onChangeHandler = (e) => {
        let value = '';
        if (e.target.type) {
            value = e.target.value;
        }

        setSearchValue(state => ({
            ...state,
            [e.target.name]: value,
        }));

    };

    return (
        <div className={styles.three_box}>
            <div className="container">

                {/* Начало на форма за търсене */}
                <form action="POST" >
                    <i className="fa fa-search" aria-hidden="true" />
                    <label htmlFor="search" className={styles.label} >Т</label>
                    <input type="text"
                        name="search"
                        value={searchValue.search}
                        className={styles.myInput}
                        onChange={onChangeHandler}
                        placeholder=" Търсене по модел.. " />
                </form>
                {/* Край на форма за търсене */}

                <div className="row">

                    {isLoading && < Loader />}

                    {technique.length > 0
                        ? (
                            <>

                                {technique.map(tech => (
                                    < Product
                                        key={tech._id}
                                        productId={tech._id}
                                        type={tech.type}
                                        model={tech.model}
                                        description={tech.description}
                                        price={tech.price}
                                        img={tech.img}
                                    />
                                ))}

                            </>
                        )
                        :
                        <div className={styles.no_technique}>
                            <p className={styles.no_content}>Няма обяви за показване!</p>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}