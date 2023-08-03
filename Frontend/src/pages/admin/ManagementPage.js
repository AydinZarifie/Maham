import styles from "../../styles/Management.module.css";

import { useEffect, useState } from "react";

import Add from "../../components/adminPage/management/Add";
import CountryInformations from "../../components/adminPage/management/CountryInformations";
import EstateTable from "../../components/adminPage/management/EstateTable";
import Gainers from "../../components/adminPage/management/Gainers";
import HighestVolumes from "../../components/adminPage/management/HighestVolumes";
import fetchInstance from "../../util/fetchInstance";

const ManagementPage = () => {
  const [countryMenuShown, setCountryMenuShown] = useState(false);
  const [cityMenuShown, setCityMenuShown] = useState(false);
  const [addShown, setAddShown] = useState(false);

  const [selectedCountryOption, setSelectedCountryOption] = useState(null);
  const [selectedCityOption, setSelectedCityOption] = useState(null);
  const [searchedEstates, setSearchedEstates] = useState([]);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const toggleCountryMenu = () => {
    setCountryMenuShown((prev) => !prev);
  };

  const toggleCityMenu = () => {
    setCityMenuShown((prev) => !prev);
  };

  const showAddHandler = () => {
    setAddShown((prev) => !prev);
  };

  const handleCountryOptionSelect = (option) => {
    setSelectedCountryOption(option);
    cityFetch(option);
    setCountryMenuShown(false);
  };

  const handleCityOptionSelect = async (option) => {
    setSelectedCityOption(option);
    setCityMenuShown(false);

    let { response, data } = await fetchInstance(
      "/admin/managment/getEstates/" +
        option +
        "/" +
        selectedCountryOption.country_name
    );

    setSearchedEstates(data.data);
  };

  const cityFetch = async (name) => {
    let { response, data } = await fetchInstance(
      "/admin/managment/getCities/" + name.country_name
    );
    setCities(data.data);
  };

  const submitHandler = async (cityName, countryName, img) => {
    const formData = new FormData();

    formData.append("countryName", countryName);
    formData.append("cityName", cityName);

    let url;
    if (img) {
      url = "/admin/managment/addCountry";
      formData.append("images", img);
    } else {
      url = "/admin/managment/addCity";
    }

    let { response } = await fetchInstance(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      window.location.reload(true);
    }
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      let { response, data } = await fetchInstance("/admin/managment");
      setCountries(data.data);
    };
    fetchCountryData();
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
          <div className={styles.dropdown}>
            <div className={styles.selectedOption} onClick={toggleCountryMenu}>
              {selectedCountryOption ? (
                <div className={styles.menuResult}>
                  <img
                    src={`/${selectedCountryOption.country_logo.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={selectedCountryOption.country_name}
                    className={styles.Logo}
                  />
                  {selectedCountryOption.country_name}
                </div>
              ) : (
                <span>Select a country</span>
              )}
              <span
                className={`${styles.arrow} ${
                  countryMenuShown ? `${styles.open}` : ""
                }`}
              >
                &#9660;
              </span>
            </div>
            {countryMenuShown && (
              <>
                <div
                  className={styles.overlay2}
                  onClick={toggleCountryMenu}
                ></div>
                <ul className={styles.options}>
                  {countries.map((option) => (
                    <li
                      key={option.country_name}
                      onClick={() => handleCountryOptionSelect(option)}
                    >
                      <img
                        src={`/${option.country_logo.replace(/\\/g, "/")}`}
                        alt={option.country_name}
                      />
                      {option.country_name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* <button
            className={styles.CountrySelect}
            onClick={toggleCountryMenu}
            // onChange={cityFetch}
          >
            {cities.length > 0 ? data.countryName : "choose country"}
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
                      // img={country.country_name}
                      clickHandler={toggleCountryMenuAndCityFetch}
                    />
                  ))}
              </div>
            </>
          )} */}
        </div>
        <div className={styles.CountryMenu}>
          <div className={styles.dropdown}>
            <div className={styles.selectedOption} onClick={toggleCityMenu}>
              {selectedCityOption ? (
                <div>{selectedCityOption}</div>
              ) : (
                <span>Select a city</span>
              )}
              <span
                className={`${styles.arrow} ${
                  cityMenuShown ? `${styles.open}` : ""
                }`}
              >
                &#9660;
              </span>
            </div>
            {cityMenuShown && (
              <>
                <div className={styles.overlay2} onClick={toggleCityMenu}></div>

                <ul className={styles.options}>
                  {cities.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleCityOptionSelect(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* <button className={styles.CountrySelect} onClick={toggleCityMenu}>
            {searchedEstates.length > 0 ? data.cityName : "choose city"}
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
          )} */}
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
      <EstateTable estates={searchedEstates} />
    </>
  );
};

export default ManagementPage;
