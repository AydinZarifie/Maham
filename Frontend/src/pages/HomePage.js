import { useState } from "react";
import Filters from "../components/filter/Filters";
import EstateItem from "../components/general/EstateItem";
import Navbar from "../components/general/Navbar";
import PhoneMenu from "../components/general/PhoneMenu";
import Preferences from "../components/general/Preferences";
import SearchModal from "../components/general/SearchModal";
import Slogan from "../components/general/Slogan";

import styles from "../styles/homePage.module.css";

const HomePage = () => {
  const [searchShown, setSearchShown] = useState(false);

  const toggleSearchShown = () => {
    setSearchShown((prev) => !prev);
  };

  const [filterShown, setFilterShown] = useState(false);

  const toggleFilterShown = () => {
    setFilterShown((prev) => !prev);
  };
  return (
    <>
      <Navbar
        searchShown={searchShown}
        searchCloseHandler={toggleSearchShown}
        filterShown={filterShown}
        filterShowHandler={toggleFilterShown}
      />
      <Slogan />
      <Preferences
        clickHandlerForSearchShown={toggleSearchShown}
        clickHandlerForFilterShown={toggleFilterShown}
      />
      <div id="container2" className={styles.container2}>
        <EstateItem />
        <EstateItem />
        <EstateItem />
        <EstateItem />
        <EstateItem />
        <EstateItem />
        <EstateItem />
        <EstateItem />
        <EstateItem />
        <EstateItem />
        <EstateItem />
      </div>
    </>
  );
};

export default HomePage;
