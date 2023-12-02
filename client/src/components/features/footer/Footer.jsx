import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.copyright}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>
                  © 2023 All Rights Reserved. Design by <Link to="https://github.com/fanitaadamova">Fanka Adamova</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

}