import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={styles.not_found}>
            <p className={styles.page_404}>А сега накъде?</p>
            <p className={styles.page_404}>Търсената от теб страница не съществува.</p>
            <button className={styles.send_btn}>
                <Link className="nav-link" to="/">Начало</Link>
            </button>
        </div>
    );
}