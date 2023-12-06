import styles from './Profile.module.css';
import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';
import * as techniqueAPI from '../../../../api/techniqueAPI';
import * as purchaseAPI from '../../../../api/purchaseAPI';
import Loader from '../../../shared/Loader';
import Product from '../../products/product/Product';


export default function Profile() {
    const { auth } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [ownProducts, setOwnProducts] = useState([]);
    const [boughtProduct, setBoughtProduct] = useState([]);
    const [totalSum, setTotalSum] = useState(0);



    useEffect(() => {
        setIsLoading(true);

        techniqueAPI.getMyOwnProducts(auth._id)
            .then((result) => setOwnProducts(result))
            .catch((error) => console.log(error.message))
            .finally(() => setIsLoading(false));


        purchaseAPI.getBoughtProducts(auth._id)
            .then(res => {
                setBoughtProduct(res);

                const sum = res.reduce((accumulator, x) => {
                    return accumulator + Number(x.productId.price);
                }, 0);
                setTotalSum(sum);

            })
            .catch((error) => console.log(error.message));


    }, [auth]);


    return (
        <>
            <section className={styles.profile}>
                {isLoading && < Loader />}

                <div className="container py-5">

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    {/* get dynamic avatar image */}
                                    <img
                                        src="https://i.pravatar.cc/500"
                                        alt="avatar"
                                        className="rounded-circle img-fluid"
                                    />

                                </div>
                            </div>

                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Потребителско име</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{auth.username}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">E-mail адрес</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{auth.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Мобилен номер</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{auth.phone}</p>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={styles.created_products}>
                    <div className="container">
                        <div className={styles.titlepage}>
                            <h2>Създадени оферти</h2>
                        </div>
                        <div className={styles.dummy}></div>


                        {ownProducts.length > 0
                            ? (<>
                                <div className="row">
                                    {ownProducts.map(tech => (
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
                            </>)
                            : <div className={styles.no_technique}>
                                <p className={styles.no_content}>Няма създадени оферти.</p>
                            </div>
                        }

                    </div>
                </div>

                <div className={styles.bought_products}>
                    <div className="container">


                        {boughtProduct.length > 0
                            ? (<>

                                <div className={styles.titlepage}>
                                    <h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                        </svg>
                                        <span className={styles.sum}> {totalSum} BGN </span>
                                        - {boughtProduct.length} покупки</h2>

                                </div>
                                <div className={styles.dummy}></div>

                                <div className="row">
                                    {boughtProduct.map(tech => (
                                        < Product
                                            productId={tech.productId._id}
                                            key={tech.productId._id}
                                            type={tech.productId.type}
                                            model={tech.productId.model}
                                            description={tech.productId.description}
                                            price={tech.productId.price}
                                            img={tech.productId.img}
                                        />
                                    ))}

                                </div>
                            </>)
                            :
                            <>
                                <div className={styles.titlepage}>
                                    <h2>Няма закупени продукти</h2>
                                    <div className={styles.dummy}></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" className="bi bi-cart-x" viewBox="0 0 16 16">
                                        <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                    </svg>
                                </div>

                            </>
                        }

                    </div>
                </div>

            </section>


        </>



    );
}