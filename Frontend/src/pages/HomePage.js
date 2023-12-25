import styles from "../styles/homePage.module.css";

import { useEffect, useState } from "react";

import EstateItem from "../components/general/EstateItem";
import Navbar from "../components/general/Navbar";
import Preferences from "../components/general/Preferences";
import Slogan from "../components/general/Slogan";
import Menu from "../components/general/Menu";

const HomePage = () => {
  const [searchShown, setSearchShown] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);

  const toggleSearchShown = () => {
    setSearchShown((prev) => !prev);
  };

  const [filterShown, setFilterShown] = useState(false);

  const toggleFilterShown = () => {
    setFilterShown((prev) => !prev);
  };

  const [filters, setFilters] = useState([]);
  const [estates, setEstates] = useState([
    {
      imageUrl: [],
      estate_title: "beach home in ohaio ",
      PM: 2,
      country_name: "Usa",
      city_name: "california",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
    {
      imageUrl: [],
      estate_title: "beach",
      PM: 2,
      country_name: "iran",
      city_name: "tabriz",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
    {
      imageUrl: [],
      estate_title: "beach",
      PM: 2,
      country_name: "iran",
      city_name: "tabriz",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
    {
      imageUrl: [],
      estate_title: "beach",
      PM: 2,
      country_name: "iran",
      city_name: "tabriz",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
    {
      imageUrl: [],
      estate_title: "beach",
      PM: 2,
      country_name: "iran",
      city_name: "tabriz",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
    {
      imageUrl: [],
      estate_title: "beach",
      PM: 2,
      country_name: "iran",
      city_name: "tabriz",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
    {
      imageUrl: [],
      estate_title: "beach",
      PM: 2,
      country_name: "iran",
      city_name: "tabriz",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
    {
      imageUrl: [],
      estate_title: "beach",
      PM: 2,
      country_name: "iran",
      city_name: "tabriz",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
    {
      imageUrl: [],
      estate_title: "beach",
      PM: 2,
      country_name: "iran",
      city_name: "tabriz",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
    {
      imageUrl: [],
      estate_title: "beach",
      PM: 2,
      country_name: "iran",
      city_name: "tabriz",
      monthOfBuild: "july",
      yearOfBuild: 1992,
      metrage: 125,
      customer_price: 11,
    },
  ]);

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
    if (window.innerWidth < 820) {
      setScrolledDown(true);
    }
    if(!scrolledDown){
        document.body.style.overflow='hidden'
    }else{
      document.body.style.overflow=''
    }
    const handleScroll = () => {
      const size = document.getElementById("container2");

      
     
      // if (window.scrollY +130 > size.offsetTop) {
      //   setScrolledDown(true);
      // }
    };

    const handleResize=()=>{
      if (window.innerWidth < 830) {
        setScrolledDown(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
    };
  }, [filters, estates,scrolledDown]);

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
      <Menu scrolledDown={scrolledDown} />
      {scrolledDown ? null : <Slogan onClicked={()=>setScrolledDown(true)} />}
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
