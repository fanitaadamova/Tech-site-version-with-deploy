import { Link } from 'react-router-dom';

export default function BanerMain() {
    return (
        <section className="banner_main">
        <div id="banner1" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#banner1" data-slide-to={0} className="active" />
            <li data-target="#banner1" data-slide-to={1} />
            <li data-target="#banner1" data-slide-to={2} />
            <li data-target="#banner1" data-slide-to={3} />
            <li data-target="#banner1" data-slide-to={4} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="carousel-caption">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-bg">                      
                        <h1>Лаптопи</h1>
                        <p>
                        Тук може да намериш интересни обяви на ЛАПТОПИ. Ако искаш да купиш нещо - може да намериш атрактивни предложения на цени, по-ниски, отколкото в магазина. Ако искаш да продадеш нещо - можеш да добавиш обява бързо, лесно и безплатно и да пуснеш за продажба своя лаптоп. {" "}
                        </p>
                        <Link  to="/laptops">Оферти за лаптопи</Link>{" "}    
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text_img">
                        <figure>
                          <img src="images/pct.png" alt="#" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="carousel-caption">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-bg">
                        <h1>Таблети</h1>
                        <p>
                        Тук може да намериш интересни обяви на ТАБЛЕТИ. Ако искаш да купиш нещо - може да намериш атрактивни предложения на цени, по-ниски, отколкото в магазина. Ако искаш да продадеш нещо - можеш да добавиш обява бързо, лесно и безплатно и да пуснеш за продажба своя таблет.{" "}
                        </p>
                        <Link  to="/tablets">Оферти за таблети</Link>{" "} 
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text_img">
                        <figure>
                          <img src="images/pct.png" alt="#" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="carousel-caption">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-bg">
                        <h1>Телефони</h1>
                        <p>
                        Тук може да намериш интересни обяви на МОБИЛНИ АПАРАТИ. Ако искаш да купиш нещо - може да намериш атрактивни предложения на цени, по-ниски, отколкото в магазина. Ако искаш да продадеш нещо - можеш да добавиш обява бързо, лесно и безплатно и да пуснеш за продажба своя телефон.{" "}
                        </p>
                        <Link  to="/phones">Оферти за телефони</Link>{" "} 
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text_img">
                        <figure>
                          <img src="images/pct.png" alt="#" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="carousel-caption">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-bg">
                        <h1>Смарт Часовници</h1>
                        <p>
                        Тук може да намериш интересни обяви на СМАРТ ЧАСОВНИЦИ. Ако искаш да купиш нещо - може да намериш атрактивни предложения на цени, по-ниски, отколкото в магазина. Ако искаш да продадеш нещо - можеш да добавиш обява бързо, лесно и безплатно и да пуснеш за продажба своя смарт часовник. {" "}
                        </p>
                        <Link  to="/smart-watches">Оферти за часовници</Link>{" "} 
                      
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text_img">
                        <figure>
                          <img src="images/pct.png" alt="#" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="carousel-caption">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-bg">
                        <h1>Аксесоари</h1>
                        <p>
                        Тук може да намериш интересни обяви на Аксесоари. Ако искаш да купиш нещо - може да намериш атрактивни предложения на цени, по-ниски, отколкото в магазина. Ако искаш да продадеш нещо - можеш да добавиш обява бързо, лесно и безплатно и да пуснеш за продажба своя Аксесоар.{" "}
                        </p>
                        <Link  to="/accessories">Оферти за аксесоари</Link>{" "} 
                  
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text_img">
                        <figure>
                          <img src="images/pct.png" alt="#" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#banner1"
            role="button"
            data-slide="prev"
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
          </a>
          <a
            className="carousel-control-next"
            href="#banner1"
            role="button"
            data-slide="next"
          >
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </a>
        </div>
      </section>
    );
}