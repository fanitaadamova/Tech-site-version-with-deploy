import { Link , NavLink} from 'react-router-dom';
import styles from './Product.module.css';

export default function Product({
    productId,
    type,
    model,
    description,
    price,
    img,
}) {
    return (
        <div className="col-md-4">
            <div className={styles.box_text}>
                <i>
                    <img className={styles.image} src={img} alt={model} />
                </i>
                <h3>{type}</h3>
                <h4>{model}</h4>
                <h3>{price} BGN</h3>
                <br />
                <button className={styles.read_more}>
                    <Link className="nav-link" to={`/details/${productId}`} >
                        Виж повече</Link>
                </button>

            </div>
        </div>
    );
}