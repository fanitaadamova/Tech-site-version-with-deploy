import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div className={styles.loader_bg}>
            <div className={styles.loader}>
                <img src="images/loading.gif" alt="#" />
            </div>
        </div>
    );

}