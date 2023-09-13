import { Link } from "react-router-dom";
import styles from "../styles/test.module.css";

const Header = (props) => {
  return (
    <div className={styles.Menu}>
      <div className={styles.underline}>
        <Link to="/">home</Link>
      </div>
      <div className={styles.underline}>
        <Link to="/assets">Assets</Link>
      </div>
      <div className={styles.underline}>
        <Link to="lendingandborrowing">lending & borrowing</Link>
      </div>

      <button
        className={styles.ConnectWalletBtn}
        role="button"
        onClick={props.onWalletClick}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default Header;
