import styles from './ProductDetails.module.css';
import { useEffect, useState, useContext, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as techniqueAPI from '../../../../api/techniqueAPI';
import * as purchaseAPI from '../../../../api/purchaseAPI';
import * as commentAPI from '../../../../api/commentAPI';
import useForm from '../../../../hooks/useForm';
import { AuthContext } from '../../../../contexts/AuthContext';
import reducer from './commentReducer';

import Loader from '../../../shared/Loader';
import DeleteModal from '../delete-product/DeleteModal';

const formInitialState = { comment: '', };


export default function ProductDetails() {
    const navigate = useNavigate();
    const [comments, dispatch] = useReducer(reducer, []);

    const { auth } = useContext(AuthContext);
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [isBought, setIsBought] = useState(false);
    const [hasServerError, setHasServerError] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    const [serverError, setServerError] = useState({});


    useEffect(() => {
        techniqueAPI.getOne(productId)
            .then(result => {
                setProductDetails(result);
            })
            .catch(err => {
                if (err.code == 404) { navigate('/not-found'); }
                console.log(err.message);
            })
            .finally(() => setIsLoading(false));

        if (auth) {
            purchaseAPI.getBuyersOfProduct(productId)
                .then(result => result.includes(auth._id) ? setIsBought(true) : setIsBought(false))
                .catch(err => {
                    setHasServerError(true);
                    setServerError(err.message);
                    console.log(err.message);
                })
                .finally(() => setIsLoading(false));
        }

        commentAPI.getAllComments(productId)
            .then((result) => {

                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result,
                });
            });


    }, [productId, auth, navigate]);

    const deleteClickHandler = () => {
        setShowDelete(true);
    };


    const onDeleteProduct = (e) => {
        e.preventDefault();
        setShowDelete(false);

        techniqueAPI.remove(productId)
            .then(() => navigate('/catalog'))
            .catch(err => console.log(err));

    };

    const buyClickHandler = (e) => {
        e.preventDefault();

        purchaseAPI.purchase(productId, auth._id)
            .then(() => setIsBought(true))
            .catch(err => console.log(err));

    };

    let isOwner = false;
    let isLogdin = false;
    

    if (auth) {
        if (productDetails._ownerId === auth._id) {
            isOwner = true;
        } else {
            isLogdin = true;
        }
    }


    // ADD Comments
    const addCommentHandler = async (values) => {
        const newComment = await commentAPI.create(productId, values.comment);

        const email = auth.email;
        newComment.owner = { email };

        dispatch({ 
            type: 'ADD_COMMENT',
             payload: newComment
             });

        values.comment = '';
    };

    const { values, onChange, onSubmit } = useForm(addCommentHandler, formInitialState);



    return (
        <div className={styles.product_info}>
            {isLoading && < Loader />}

            {hasServerError && (
                <p className={styles.serverError}>Нещо се обърка :( </p>
            )}

            {showDelete && (
                <DeleteModal
                    onClose={() => setShowDelete(false)}
                    onDeleteProduct={onDeleteProduct}
                />
            )}

            <div className={styles.details}>
                <i className={styles.picture}>
                    <img className={styles.image} src={productDetails.img}
                        alt={productDetails.model} />
                </i>
                <div className={styles.content}>
                    <h3>{productDetails.type}</h3>
                    <h4>{productDetails.model}</h4>
                    <h3>{productDetails.price} BGN</h3>
                    <h4><span>Година: </span>{productDetails.year}</h4>
                    <h4>{productDetails.os}</h4>
                    <p><span>Описание: </span>{productDetails.description}</p>

                    {/* Owner of product */}
                    {isOwner && (
                        <div className={styles.buttons}>
                            <Link className={styles.edit} to={`/edit/${productId}`}>
                                Редактивай
                            </Link>
                            <a className={styles.delete} onClick={deleteClickHandler}>
                                Изтрий
                            </a>
                        </div>
                    )}
                    {isLogdin && (
                        <div className={styles.buttons}>
                            {/* Loged-in user - already bought */}
                            {isBought && (
                                <p className={styles.alreadyBought}>Вече закупи този продукт.</p>

                            )}
                            {!isBought && (
                                <a className={styles.buy} onClick={buyClickHandler}>
                                    Купи
                                </a>
                            )}
                        </div>
                    )}

                </div>
                <br />
            </div>


            {/* SECTION COMMENTS */}
            <section className={styles.comments}>
                <div className={styles.details_comments}>
                    <h2>Коментари</h2>
                    <ul>
                        {comments.map(({ _id, text, owner: { email } }) => (
                            <li key={_id} className={styles.comment_info}>
                                <i className="fa fa-user-circle"></i>
                                <span className={styles.email}> {email}</span>
                                <p className={styles.text}>{text}</p>
                            </li>
                        ))}
                    </ul>

                    {comments.length === 0 && (
                        <p className={styles.no_comment}>Няма коментари.</p>
                    )}
                </div>

            </section>

            {/* ADD Comments SECTION */}
            {(isLogdin || isOwner) && (
                <section className={styles.create_comment}>
                    <label>Добави нов коментар</label>
                    <form className={styles.form} onSubmit={onSubmit}  >
                        <textarea name="comment"
                            value={values.comment}
                            onChange={onChange}
                            placeholder="Коментар......"></textarea>
                        <input disabled={values.comment == ''} className={styles.btn_submit} type="submit" value="Изпрати" />
                    </form>
                </section>
            )}

        </div>
    );

}