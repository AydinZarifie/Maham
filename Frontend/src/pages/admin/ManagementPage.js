import { useEffect, useState } from "react";
import Add from "../../components/adminPage/management/Add";
import CountryInformations from "../../components/adminPage/management/CountryInformations";
import EstateTable from "../../components/adminPage/management/EstateTable";
import Gainers from "../../components/adminPage/management/Gainers";
import HighestVolumes from "../../components/adminPage/management/HighestVolumes";

import styles from "../../styles/Management.module.css";
import CountryAndCityMenuItem from "../../components/adminPage/management/CountryAndCityMenuItem";
import { json } from "react-router-dom";

const ManagementPage = () => {
  const [countryMenuShown, setCountryMenuShown] = useState(false);

  const toggleCountryMenu = () => {
    setCountryMenuShown((prev) => !prev);
  };

  const [cityMenuShown, setCityMenuShown] = useState(false);

  const toggleCityMenu = () => {
    setCityMenuShown((prev) => !prev);
  };

  const toggleCountryMenuAndCityFetch = async (name) => {
    console.log(name);
    setData((prev) => ({ ...prev, countryName: name }));
    cityFetch(name);
    setCountryMenuShown((prev) => !prev);
  };

  const [data, setData] =  useState({
    countryName: "",
    cityName: "",
  });

  const [searchedEstates, setSearchedEstates] = useState([]);

  const cityFetchClickHandler = async (cityName) => {
    console.log("0");
    console.log("1");
    const res=await fetch("http://localhost:5000/admin/managment/getEstates/" + cityName +"/"+data.countryName);
    const json=await res.json();
    console.log(json.data);
    console.log("2");
    setSearchedEstates(json)
  };

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const cityFetch = async (countryName) => {
    const response = await fetch(
      "http://localhost:5000/admin/managment/getCities/" + countryName
     );
     const json = await response.json();
     setCities(json.data)
  
  };

  const [addShown, setAddShown] = useState(false);
  const showAddHandler = () => {
    setAddShown((prev) => !prev); 
  };

  const submitHandler = async (cityName, countryName, img) => {
    const formData = new FormData();

    formData.append("countryName", countryName);
    formData.append("cityName", cityName);

    let url;
    if (img) {
      url = "http://localhost:5000/admin/managment/addCountry";
      formData.append("images", img);
    } else {
      url = "http://localhost:5000/admin/managment/addCity";
    } 

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    showAddHandler();
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      const data = await fetch("http://localhost:5000/admin/managment");
      const json = await data.json();
      setCountries(json.data);
      console.log(data);
    };

    fetchCountryData()  ;
  }, []);

  // const eventHandler = (event) => {
  //   const { name, value } = event.target;
  // };

  return (
    <>
      <div className={styles.Tables}>
        <div className={styles.Tables12}>
          <HighestVolumes />
          <Gainers />
        </div>
        <CountryInformations
        // countries={countries}
        />
      </div>
      <div className={styles.SelectAndAdd}>
        <div className={styles.CountryMenu}>
          <button
            className={styles.CountrySelect}
            onClick={toggleCountryMenu}
            // onChange={cityFetch}
          >
            choose country
          </button>
          {countryMenuShown && (
            <>
              <div
                className={styles.overlay2}
                onClick={toggleCountryMenu}
              ></div>
              <div className={styles.Items}>
                {countries.length > 0 &&
                 countries.map((country) => (
                    <CountryAndCityMenuItem
                      // key
                      name={country.country_name}
                      clickHandler={toggleCountryMenuAndCityFetch}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
        <div className={styles.CountryMenu}>
          <button className={styles.CountrySelect} onClick={toggleCityMenu}>
            choose city
          </button>
          {cityMenuShown && (
            <>
              <div className={styles.overlay2} onClick={toggleCityMenu}></div>
              <div className={styles.Items}>
                {cities.length > 0 &&
                  cities.map((city) => (
                    <CountryAndCityMenuItem
                      name={city}
                      clickHandler={cityFetchClickHandler}
                    />
                  ))}
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          className={styles.AddButton}
          onClick={showAddHandler}
        >
          Add
        </button>
      </div>
      {addShown && (
        <Add
          submitHandler={submitHandler}
          closeHandler={showAddHandler}
          countries={countries}
        />
      )}
      <EstateTable />
    </>
  );
};

export default ManagementPage;
