import styles from "../../styles/homePage.module.css";
import overlayStyle from "../../styles/overlay.module.css";

import { useState } from "react";

import homeLogo from "../../images/home-home-svgrepo-com (1).svg";
import creditLogo from "../../images/credit-card-2-svgrepo-com.svg";
import aboutLogo from "../../images/about-svgrepo-com (1).svg";

const PhoneMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <span className={styles.OpenNav} onClick={toggleMenu}>
        &#9776;
      </span>
      {isOpen && <div className={overlayStyle.overlay} onClick={toggleMenu} />}
      <div className={`${styles.bottomMenu} ${isOpen ? styles.open : ""}`}>
        <a className={styles.closebtn} onClick={toggleMenu}>
          &times;
        </a>
        <a href="#">
          <span className={styles.sidenavItems}>
            <img src={homeLogo} className={styles.sidenavItemsIcn} />
            Home
          </span>
          <hr className={styles.phoneMenuHr} />
        </a>
        <a href="#">
          <span className={styles.sidenavItems}>
            <img src={creditLogo} className={styles.sidenavItemsIcn} />
            Bank
          </span>
          <hr className={styles.phoneMenuHr} />
        </a>
        <a href="#">
          <span className={styles.sidenavItems}>
            <img src={aboutLogo} className={styles.sidenavItemsIcn} />
            About us
          </span>
          <hr className={styles.phoneMenuHr} />
        </a>
        <button className={styles.ConnectWalletBtn2}>Connect Wallet</button>
      </div>
    </>
  );
};

export default PhoneMenu;
