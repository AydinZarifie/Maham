import styles from "../styles/homePage.module.css";

import { useEffect, useState } from "react";

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

  const [filters, setFilters] = useState([]);
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const data = await fetch("url");
      const json = await data.json();
      setFilters(json.data);
    };
    fetchFilters();
  }, [filters]);

  const submitSearch = async (searchPhrase) => {
    const formData = new FormData();
    formData.append("searchPhrase", searchPhrase);
    const response = await fetch("url", {
      method: "POST",
      body: formData,
    });
  };

  const submitFilterSearch = async (country, city, lowPrice, highPrice) => {
    const formData = new FormData();
    formData.append("country", country);
    formData.append("city", city);
    formData.append("lowPrice", lowPrice);
    formData.append("highPrice", highPrice);
    const response = await fetch("url", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <>
      <Navbar
        searchShown={searchShown}
        searchCloseHandler={toggleSearchShown}
        filterShown={filterShown}
        filterShowHandler={toggleFilterShown}
        submitSearch={submitSearch}
        submitFilterSearch={submitFilterSearch}
      />
      <Slogan />
      <Preferences
        clickHandlerForSearchShown={toggleSearchShown}
        clickHandlerForFilterShown={toggleFilterShown}
        filters={filters}
      />
      <div id="container2" className={styles.container2}>
        <EstateItem props={estates} />
      </div>
    </>
  );
};

export default HomePage;
