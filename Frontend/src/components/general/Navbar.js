import logo from "../../images/Maham2.png";
import filterIcon from "../../images/filter-alt-2-svgrepo-com (3).svg";
import ethLogo from "../../images/ethereum-svgrepo-com.svg";

import styles from "../../styles/homePage.module.css";

import PhoneMenu from "./PhoneMenu";
import FilterModal from "./FilterModal";

import { useState } from "react";
import SearchModal from "./SearchModal";

const Navbar = (props) => {
  return (
    <div className={styles.Menu}>
      {/* <!--name and logo--> */}
      <div>
        <a className={styles.Maham}>
          <span className={styles.LogoAndTitle}>
            <img className={styles.Logo} src={logo} />
            <h1 className={styles.Title}>MAHAM</h1>
          </span>
        </a>
      </div>

      {/* <!--Searh and filter In mobile--> */}
      <div className={styles.inputContainer}>
        <form className={styles.searchContainer}>
          <input
            type="text"
            className={`${styles.searchBox} ${styles.searchBar}`}
            placeholder="What can I help you with today?"
          />
        </form>
        <button onClick={props.filterShowHandler}>
          <img src={filterIcon} className={styles.FilterIcn2} />
        </button>
      </div>
      {props.filterShown && (
        <FilterModal toggleFilter={props.filterShowHandler} />
      )}

      {/* <!--   search in open div   --> */}
      {props.searchShown && (
        <SearchModal closeHandler={props.searchCloseHandler} />
      )}

      {/* <!--litle menu--> */}
      <div className={styles.Lmenu}>
        <div className={styles.container}>
          <section className={styles.navSection}>
            <nav className={styles.nav}>
              <span className={styles.navSpan}>
                <a href="#">Home</a>
                <a href="#">Bank</a>
                <a href="#">About us</a>
              </span>
            </nav>
          </section>
        </div>
      </div>
      {/* <!--connect wallet btn and eth price and side menu div--> */}
      <div className={styles.BtnAndPriceAndSideM}>
        <div className={styles.EthPrice}>
          <img src={ethLogo} className={styles.EthIcn} />
          <h5 className={styles.EthPriceh5}>10000$</h5>
        </div>

        <div>
          <button className={styles.ConnectWalletBtn} role="button">
            Connect Wallet
          </button>
        </div>
        <PhoneMenu />
      </div>
    </div>
  );
};

export default Navbar;
