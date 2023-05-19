import icon from "../images/Maham.png";
import styles from '../styles/Maham.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.column1}>
          <div className={styles.logo}>
            <img src={icon} alt="Maham" className={styles.logoimg} />
          </div>
          <div className={styles.nameDiv}>
            <strong className={styles.strong}>M A H A M</strong>
          </div>
        </div>

        <div className={styles.column2}>
          <div>
            <div className={styles.search}>
              <div >
                <input
                  type="text"
                  className={styles.search_text}
                  id="search_text"
                  placeholder="Search by CountryName, CityName or ..."
                />
                <i ></i>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.column3}>
          <div className={styles.EthCon}>
            <div className={styles.ethPriceDiv}>
              <i ></i>
              <p className={styles.ethPrice}>$10000.346</p>
            </div>

            <div className={styles.connectValletDiv}>
              <button className={styles.connectVallet} role="button">
                Connect Wallet
              </button>
            </div>

            <div className={styles.menuDiv}>
              <div className={styles.hambermenu}>
                <details className={styles.details}>
                  <summary className={styles.summary}></summary>
                  <nav className={styles.menu}>
                    <a href="#link">Bank</a>
                    <a href="#link">WhiteP</a>
                    <a href="#link">Contact Us</a>
                  </nav>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
