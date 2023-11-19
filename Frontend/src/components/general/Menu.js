import styles from "../../styles/menu.module.css";

import logo from "../../images/Maham2.png";
import profileLogo from "../../images/profile-circle-svgrepo-com.svg";
import menuLogo from "../../images/menu-fries-svgrepo-com.svg";
import { useRef } from "react";

const Menu = () => {
  const menuRef = useRef();
  const guideRef = useRef();

  let time;

  const toggleMenu = () => {
    if (menuRef.current.style.height == "350px") {
      menuRef.current.style.height = "0px";
      menuRef.current.style.borderBottom = "0px";
    } else {
      menuRef.current.style.height = "350px";
      menuRef.current.style.borderBottom = "1px solid rgb(209, 213, 219)";
    }
  };

  const toggleGuide = () => {
    if (guideRef.current.style.height == "350px") {
      guideRef.current.style.height = "0px";
      guideRef.current.style.borderBottom = "0px";
    } else {
      guideRef.current.style.height = "350px";
      guideRef.current.style.borderBottom = "1px solid rgb(209, 213, 219)";
    }
  };

  return (
    <header className={styles.Header}>
      <div className={styles.LogoDiv}>
        <a className={styles.Maham}>
          <span className={styles.LogoAndTitle}>
            <img className={styles.Logo} src={logo} />
            <h1 className={styles.Title}>MAHAM</h1>
          </span>
        </a>
      </div>
      <div className={styles.menuLittle}>
        <div className={styles.underline}>
          <a>Home</a>
        </div>
        <div className={styles.underline}>
          <a>MEI</a>
        </div>
        <div className={styles.underline}>
          <a onMouseEnter={toggleGuide} onMouseLeave={toggleGuide}>
            Guide
          </a>
        </div>
      </div>
      <div className={styles.HeadBtn}>
        <button className={styles.ContactBtn}>Contact us</button>
        {/* <button className={styles.LogInBtn}>Log In</button> */}
        <div className={styles.ProfileDiv}>
          <img src={profileLogo} className={styles.ProfileIcon} />
          <img
            src={menuLogo}
            className={styles.MenuIcon}
            onMouseEnter={toggleMenu}
            onMouseLeave={toggleMenu}
          />
        </div>
      </div>

      <div
        className={styles.Guide}
        onMouseEnter={toggleGuide}
        onMouseLeave={toggleGuide}
        onmousemove="ShowGuide()"
        onmouseout="HideGuide()"
        ref={guideRef}
      >
        <div className={`${styles.GuideSection} ${styles.diffrentGuide}`}>
          <h3>Guide</h3>
          <h4>- A complete guide to using the Mahm platform with details</h4>
        </div>
        <div className={styles.GuideSection}>
          <h3>User</h3>
          <h4>- A complete guide to using the Mahm platform with details</h4>
        </div>
        <div className={styles.GuideSection}>
          <h3>Estate</h3>
          <h4>- Homepage Estate</h4>
          <h4>- Estate Detailpage</h4>
          <h4>- Web3 Internet</h4>
        </div>
        <div className={styles.GuideSection}>
          <h3>Maham</h3>
          <h4>- Maham White paper</h4>
          <h4>- Burc future</h4>
        </div>
      </div>

      <div
        className={styles.HomeMenu}
        onMouseEnter={toggleMenu}
        onMouseLeave={toggleMenu}
        ref={menuRef}
      >
        <div className={styles.GuideSection}>
          <h3>Watch list</h3>
          <h4>- Wath list</h4>
        </div>
        <div className={styles.GuideSection}>
          <h3>Favourites</h3>
          <h4>- favourites</h4>
        </div>
        <div className={styles.GuideSection}>
          <h3>Management Assets</h3>
          <h4>- Assets</h4>
          <h4>- Transaction</h4>
        </div>
        <div className={styles.GuideSection}>
          <h3>Reports</h3>
          <h4>- Get document</h4>
          <h4>- Document status</h4>
        </div>
      </div>
    </header>
  );
};

export default Menu;
