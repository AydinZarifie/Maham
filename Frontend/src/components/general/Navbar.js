import styles from "../../styles/homePage.module.css";

import logo from "../../images/Maham2.png";
import filterIcon from "../../images/filter-alt-2-svgrepo-com (3).svg";
import ethLogo from "../../images/ethereum-svgrepo-com.svg";

import PhoneMenu from "./PhoneMenu";
import FilterModal from "./FilterModal";
import SearchModal from "./SearchModal";
import { useState } from "react";

const Navbar = (props) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const eventHandler = (event) => {
    const { value } = event.target;
    setSearchPhrase(value);
  };

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
        <form
          onSubmit={() => props.submitSearch(searchPhrase)}
          className={styles.searchContainer}
        >
          <input
            type="text"
            className={`${styles.searchBox} ${styles.searchBar}`}
            placeholder="What can I help you with today?"
            onChange={eventHandler}
            value={searchPhrase}
          />
        </form>
        <button onClick={props.filterShowHandler}>
          <img src={filterIcon} className={styles.FilterIcn2} />
        </button>
      </div>
      {props.filterShown && (
        <FilterModal onSubmit={props.submitFilterSearch} toggleFilter={props.filterShowHandler} />
      )}

      {/* <!--   search in open div   --> */}
      {props.searchShown && (
        <SearchModal
          submitSearch={props.submitSearch}
          closeHandler={props.searchCloseHandler}
        />
      )}

      {/* <!--litle menu--> */}
      <div className={styles.Lmenu}>
        <div className={styles.menuLittle}>
          <div className={styles.underline}>
            <a>Home</a>
          </div>
          <div className={styles.underline}>
            <a>Bank</a>
          </div>
          <div className={styles.underline}>
            <a>About us</a>
          </div>
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
