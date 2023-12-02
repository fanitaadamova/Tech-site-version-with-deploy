import styles from './Laptops.module.css';
import { useEffect, useState } from "react";
import * as techniqueAPI from '../../../../api/techniqueAPI';

import Product from "../../../features/products/product/Product";
import Loader from "../../../shared/Loader";


export default function Laptops() {
    const [laptops, setLaptops] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasServerError, setHasServerError] = useState(false);
    const [serverError, setServerError] = useState({});

    useEffect(() => {
        setIsLoading(true);
        techniqueAPI.getAllLaptops()
            .then(result => setLaptops(result))
            .catch(err => {
                console.log();
                setHasServerError(true);
                setServerError(err.message);
                console.log(err.message);
            })
            .finally(() => setIsLoading(false));

    }, []);



    return (
        <div className={styles.three_box}>
            <div className="container">
                <div className={styles.titlepage}>
                    <h2>Оферти за лаптопи</h2>
                </div>
                <div className={styles.dummy}></div>

                <div className="row">

                    {isLoading && < Loader />}
                    
                    {hasServerError && (
                        <p className={styles.serverError}>Нещо се обърка :( </p>
                    )}

                    {laptops.length > 0
                        ? (
                            <>

                                {laptops.map(tech => (
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
                        <div className={styles.no_laptops}>
                            <p className={styles.no_content}>Няма обяви за лаптопи!</p>
                        </div>
                    }


                </div>
            </div>
        </div>
    );
}