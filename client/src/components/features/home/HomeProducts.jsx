import styles from './HomeProdusts.module.css';

import { useEffect, useState } from 'react';
import * as techniqueAPI from '../../../api/techniqueAPI';

import Product from '../products/product/Product';
import Loader from '../../shared/Loader';
import BanerMain from './BanerMain';
import { Link } from 'react-router-dom';

export default function HomeProducts() {
    const [technique, setTechnique] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasServerError, setHasServerError] = useState(false);
    const [serverError, setServerError] = useState({});

    useEffect(() => {
        setIsLoading(true);
        techniqueAPI.getLastTree()
            .then(result => setTechnique(result))
            .catch(err => {
                console.log();
                setHasServerError(true);
                setServerError(err.message);
                console.log(err.message);
            })
            .finally(() => setIsLoading(false));

    }, []);

    return (
        <>
            < BanerMain />
            <div className={styles.three_box}>
                <div className="container">
                    <div className={styles.titlepage}>
                        <h2>Последни оферти</h2>
                    </div>
                    <div className={styles.dummy}></div>

                    {isLoading && < Loader />}

                    {hasServerError && (
                        <p className={styles.serverError}>Нещо се обърка :( </p>
                    )}

                    {technique.length > 0
                        ? (
                            <>
                                <div className="row">


                                    {technique.map(tech => (
                                        < Product
                                            productId={tech._id}
                                            key={tech._id}
                                            type={tech.type}
                                            model={tech.model}
                                            description={tech.description}
                                            price={tech.price}
                                            img={tech.img}
                                        />
                                    ))}

                                </div>

                                <div className="col-md-12">
                                    <button className={styles.send_btn}>
                                        <Link className="nav-link" to="/catalog">Виж всички оферти</Link>
                                    </button>
                                </div>
                            </>

                        )
                        :
                        <div className={styles.no_technique}>
                            <p className={styles.no_content}>Няма обяви за показване!</p>
                        </div>
                    }

                </div>
            </div>
        </>
    );
}