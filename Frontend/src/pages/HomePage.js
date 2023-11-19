import styles from "../styles/homePage.module.css";

import { useEffect, useState } from "react";

import EstateItem from "../components/general/EstateItem";
import Navbar from "../components/general/Navbar";
import Preferences from "../components/general/Preferences";
import Slogan from "../components/general/Slogan";
import Menu from "../components/general/Menu";

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
    const fetchEstatesData = async () => {
      const data = await fetch("urlForEstates");
      const json = await data.json();
      setEstates(json.data);
    };
    fetchEstatesData();

    const fetchFilterData = async () => {
      const data = await fetch("urlForFilters");
      const json = await data.json();
      setFilters(json.data);
    };
    fetchFilterData();
  }, [filters, estates]);

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

  const submitLike = async (title) => {
    // const formData = new FormData();
    // formData.append("title", title);
    // const response = await fetch("url", {
    //   method: "POST",
    //   body: formData,
    // });
    // if(response.ok){
    const updatedEstates = [...estates];
    let index = estates.findIndex((item) => item.estate_title == title);
    let editedEstate = { ...updatedEstates[index] };
    editedEstate.liked = !editedEstate.liked;
    updatedEstates[index] = editedEstate;
    setEstates(updatedEstates);
    // }
  };

  return (
    <>
      {/* <Navbar
        searchShown={searchShown}
        searchCloseHandler={toggleSearchShown}
        filterShown={filterShown}
        filterShowHandler={toggleFilterShown}
        submitSearch={submitSearch}
        submitFilterSearch={submitFilterSearch}
      /> */}
      <Menu />
      <Slogan />
      <Preferences
        clickHandlerForSearchShown={toggleSearchShown}
        clickHandlerForFilterShown={toggleFilterShown}
        filters={filters}
      />
      <div id="container2" className={styles.container2}>
        {estates.length > 0 &&
          estates.map((estate) => {
            return (
              <EstateItem props={estate} likeHandler={submitLike} user={true} />
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
