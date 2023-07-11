import styles from "../../styles/homePage.module.css";

import { useState } from "react";

import overlayStyle from "../../styles/overlay.module.css";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";

const FilterModal = (props) => {
  const [data, setData] = useState({
    country: "",
    city: "",
    firstValue: 0,
    secondValue: 1,
  });
  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
              <option value="IRI">IRI</option>
              <option value="USA">USA</option>
              <option value="UAE">UAE</option>
              <option value="GER">GER</option>
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
              <option value="Tabriz">Tabriz</option>
              <option value="Esfahan">Esfahan</option>
              <option value="Tehran">Tehran</option>
              <option value="Mashhad">Mashhad</option>
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
            <button className={styles.SubmitBtn} role="button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
