import styles from "../../styles/Management.module.css";

import { useEffect, useState } from "react";

import Add from "../../components/adminPage/management/Add";
import CountryInformations from "../../components/adminPage/management/CountryInformations";
import EstateTable from "../../components/adminPage/management/EstateTable";
import Gainers from "../../components/adminPage/management/Gainers";
import HighestVolumes from "../../components/adminPage/management/HighestVolumes";
import fetchInstance from "../../util/fetchInstance";
import { lock, unlock } from "../web3/MHM2023";
import { ethers } from "ethers";

const ManagementPage = () => {
  const [loading, setLoading] = useState(false);

  const [countryMenuShown, setCountryMenuShown] = useState(false);
  const [cityMenuShown, setCityMenuShown] = useState(false);
  const [addShown, setAddShown] = useState(false);

  const [selectedCountryOption, setSelectedCountryOption] = useState(null);
  const [selectedCityOption, setSelectedCityOption] = useState(null);
  const [searchedEstates, setSearchedEstates] = useState([
    // {
    //   estate_title: "beach",
    //   _id: 0,
    //   sell_position: true,
    //   lock_position: true,
    // },
    // {
    //   estate_title: "air",
    //   _id: 1,
    //   sell_position: false,
    //   lock_position: false,
    // },
  ]);

  const [countryInformations, setCountryInformations] = useState([]);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [error, setError] = useState(false);

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
        selectedCountryOption.country_name +
        "/" +
        option
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
    if (response.status == 400) {
      setError("City already exists");
    } else if (response.status == 401) {
      setError("Country already exists");
    }
  };

  const LockEstate = async (id, mintID, lockPosition) => {
    setLoading(true);
    let { response } = await fetchInstance(
      "/admin/managment/lockUnLockEstate/" + id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mintID),
      }
    );
    if (response.ok) {
      console.log(lockPosition);
      const mintId = Number(mintID);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      if (!lockPosition) {
        console.log("2");
        console.log(lockPosition);
        const txLock = await lock(mintId, signer);
        console.log(txLock);
      } else {
        console.log(3);
        console.log(lockPosition);
        const txUnlock = await unlock(mintId, signer);
        console.log(txUnlock);
        console.log(4);
      }

      const updatedEstates = [...searchedEstates];
      let index = searchedEstates.findIndex((item) => item._id == id);
      let editedEstate = { ...updatedEstates[index] };
      editedEstate.lock_position = !editedEstate.lock_position;
      updatedEstates[index] = editedEstate;

      setSearchedEstates(updatedEstates);
    }
    setLoading(true);
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      let { response, data } = await fetchInstance("/admin/managment");
      setCountries(data.data);
    };
    fetchCountryData();

    const fetchCountryInfromationData = async () => {
      let { response, data } = await fetchInstance(
        "/admin/managment/countriesInfo"
      );
      setCountryInformations(data.data);
    };
    fetchCountryInfromationData();
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
        <CountryInformations data={countryInformations} />
      </div>
      <div className={styles.SelectAndAdd}>
        <div className={styles.CountryMenu}>
          <div className={styles.dropdown}>
            <div className={styles.selectedOption} onClick={toggleCountryMenu}>
              {selectedCountryOption ? (
                <div className={styles.menuResult}>
                  <img
                    src={`http://localhost:5000/${selectedCountryOption.country_logo.replace(
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
                  {countries.length > 0 &&
                    countries.map((option) => (
                      <li
                        key={option.country_name}
                        onClick={() => handleCountryOptionSelect(option)}
                      >
                        <img
                          src={`http://localhost:5000/${option.country_logo.replace(
                            /\\/g,
                            "/"
                          )}`}
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
                  {cities.length > 0 &&
                    cities.map((option) => (
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
          error={error}
        />
      )}
      <EstateTable estates={searchedEstates} lockEstate={LockEstate} />
      {loading && <div>loading</div>}
    </>
  );
};

export default ManagementPage;
