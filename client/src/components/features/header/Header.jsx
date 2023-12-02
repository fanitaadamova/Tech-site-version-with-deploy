import styles from './Header.module.css';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';
import * as authAPI from '../../../api/authAPI';

export default function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);


  async function logoutHandler(e) {
    e.preventDefault();

    try {
      await authAPI.logout();
      setAuth(null);

      navigate('/');
    } catch (error) {
      console.log(error.message);
      setAuth(null);
      
      navigate('/login');
    }

  }

  return (
    <header>
      {/* header inner */}
      <div className={styles.header}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
              <div className="full">
                <div className="center-desk">
                  <div className={styles.logo}>
                    <Link to="/">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMN53dWnX0RWs8ORBr3oeFyp865sRBYhZh4g&usqp=CAU" alt="#" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
              <nav className="navigation navbar navbar-expand-md navbar-dark ">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarsExample04"
                  aria-controls="navbarsExample04"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/search">
                        <i className="fa fa-search" aria-hidden="true" />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Начало</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/catalog">Каталог</Link>
                    </li>

                    {auth ?
                      // Loged-in user
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/add-product">Създай</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/profile">
                            Профил
                          </Link>
                        </li>
                        <li className="nav-item" onClick={logoutHandler} >
                          <Link className="nav-link">
                            Изход
                          </Link>
                        </li>
                      </> :

                      // GUEST
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/register">Регистрация</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/login">Вход</Link>
                        </li>
                      </>}

                  </ul>

                </div>
              </nav>
            </div>
          </div>
        </div>
      </div >
    </header >

  );
}