import { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';



export default function Footer() {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    setCurrentYear(state => state = new Date().getFullYear());                                      // Get the current year dynamically

  }, []);


  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.copyright}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>
                  © Tech shop {currentYear} <Link to="https://github.com/fanitaadamova">Фанка Адамова</Link>. Всички права запазени.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

}