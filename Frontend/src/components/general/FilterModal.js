import styles from "../../styles/homePage.module.css";

import { useState } from "react";

import overlayStyle from "../../styles/overlay.module.css";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";
import Select from "./Select";

const FilterModal = (props) => {
  const [data, setData] = useState({
    country: "Country",
    city: "City",
    firstValue: 0,
    secondValue: 999999,
  });

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
          {/* <div className={styles.customSelect}>
            <select
              value={data.country}
              name="country"
              onChange={eventHandler}
              className={styles.CountrySelect}
            >
              <option value="">choose a country</option>
              {props.countries.length>0 && props.countries.map((option) => (
                <option key={option.country_name} value={option.country_name}>
                  {option.country_name}
                </option>
              ))}
            </select>
          </div> */}

          <div className={styles.selectDiv}>
            <Select
              items={
                props.countries.length > 0
                  ? props.countries.map((option) => option.country_name)
                  : []
              }
              set={(option) => {
                props.cityFetch(option);
                setData((prev) => ({ ...prev, country: option }));
              }}
              selected={data.country}
              style={{
                background: "rgba(239, 239, 239, 0)",
                height: "38px",
                border: "1px solid rgb(198, 196, 196)",
                borderRadius: "4px",
                color: "#626262",
                zIndex: "100",
                position: "relative",
                fontSize: "13px",
              }}
            />
          </div>

          <div className={styles.selectDiv}>
            <Select
              items={props.cities.length > 0 ? props.cities : []}
              set={(option) => setData((prev) => ({ ...prev, city: option }))}
              selected={data.city}
              style={{
                background: "rgba(239, 239, 239, 0)",
                height: "38px",
                border: "1px solid rgb(198, 196, 196)",
                borderRadius: "4px",
                color: "#626262",
                zIndex: "100",
                position: "relative",
                fontSize: "13px",
              }}
            />
          </div>

          {/* <div className={styles.customSelect}>
            <select
              value={data.city}
              name="city"
              onChange={eventHandler}
              className={styles.CountrySelect}
            >
              <option value="">City</option>
              {props.cities.length > 0 &&
                props.cities.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div> */}

          <MultiRangeSlider
            min={0}
            max={999999}
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
                if (data.country === "Country" || data.city === "City") {
                  return;
                }
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
