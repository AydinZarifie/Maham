import styles from "../../styles/homePage.module.css";

import { useEffect, useState } from "react";

import overlayStyle from "../../styles/overlay.module.css";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";

const FilterModal = (props) => {
  const [data, setData] = useState({
    country: "",
    city: "",
    firstValue: 0,
    secondValue: 1000,
  });

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name == "country") {
      props.cityFetch(value);
    }
  };

  // useEffect(() => {
  //   const fetchCountryData = async () => {
  //     const data = await fetch("url");
  //     const json = await data.json();
  //     setCountries(json.data);
  //   };
  //   fetchCountryData();
  // }, []);

  // const cityFetch = async (name) => {
  //   const response = await fetch("url" + name);
  //   const json = await response.json();
  //   setCities(json.data);
  // };

  return (
    <>
      <div className={overlayStyle.overlay2} onClick={props.toggleFilter}></div>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={props.toggleFilter}>
          &times;
        </span>

        <div className={styles.FilterDiv}>
          <div className={styles.customSelect}>
            <select
              value={data.country}
              name="country"
              onChange={eventHandler}
              className={styles.CountrySelect}
            >
              <option value="">choose a country</option>
              {props.countries.map((option) => (
                <option key={option.country_name} value={option.country_name}>
                  {option.country_name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.customSelect}>
            <select
              value={data.city}
              name="city"
              onChange={eventHandler}
              className={styles.CountrySelect}
            >
              <option value="">City</option>
              {props.cities.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <MultiRangeSlider
            min={0}
            max={1000}
            onChange={({ min, max }) =>
              // console.log(`min = ${min}, max = ${max}`)
              setData((prev) => ({
                ...prev,
                firstValue: min,
                secondValue: max,
              }))
            }
          />

          <div>
            <button
              className={styles.SubmitBtn}
              role="button"
              onClick={() => {
                props.onSubmit(
                  data.country,
                  data.city,
                  data.firstValue,
                  data.secondValue
                );
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
