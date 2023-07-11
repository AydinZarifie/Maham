import styles from "../styles/homePage.module.css";

import { useState } from "react";

import EstateItem from "../components/general/EstateItem";
import Navbar from "../components/general/Navbar";
import Preferences from "../components/general/Preferences";
import Slogan from "../components/general/Slogan";

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
      </div>
    </>
  );
};

export default HomePage;
