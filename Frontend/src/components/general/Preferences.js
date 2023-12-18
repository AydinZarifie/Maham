import styles from "../../styles/preferences.module.css";

import serachIcon from "../../images/search-svgrepo-com.svg";
import filterIcon from "../../images/filter-alt-2-svgrepo-com (4).svg";
import whiteSearchIcon from "../../images/search-white-svgrepo-com.svg"

import Filters from "../filter/Filters";
import { useRef, useState } from "react";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";

const Preferences = (props) => {
  const [countery, setCountry] = useState();
  const [city, setCity] = useState();
  const [price, setPrice] = useState({
    firstValue: 0,
    secondValue: 1000,
  });
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const CircleFilterRef = useRef();
  const OpenFilterRef = useRef();
  const SearchCircleRef = useRef();

  const CountryFilterDivRef = useRef();
  const CityFilterDivRef = useRef();
  const PriceFilterDivRef = useRef();

  const toggleFilter = () => {
    if (filterIsOpen) {
      setFilterIsOpen(false);
      CircleFilterRef.current.style.width = "320px";
      CircleFilterRef.current.style.height = "40px";
      CircleFilterRef.current.style.fontSize = ".9rem";

      OpenFilterRef.current.style.height = "00px";
      OpenFilterRef.current.style.borderBottom = "0px solid rgb(209, 213, 219)";

      SearchCircleRef.current.style.minWidth = "35px";
      SearchCircleRef.current.style.maxWidth = "35px";
      SearchCircleRef.current.style.minHeight = "35px";
      SearchCircleRef.current.style.maxHeight = "35px";

      CountryFilterDivRef.current.style.height = "0px";
      CountryFilterDivRef.current.style.border = "0px solid #ffffff";

      CityFilterDivRef.current.style.height = "0px";
      CityFilterDivRef.current.style.border = "0px solid #ffffff";

      PriceFilterDivRef.current.style.height = "0px";
      PriceFilterDivRef.current.style.border = "0px solid #ffffff";
    } else {
      setFilterIsOpen(true);
      CircleFilterRef.current.style.width = "72%";
      CircleFilterRef.current.style.height = "52px";
      CircleFilterRef.current.style.fontSize = "1rem";

      OpenFilterRef.current.style.height = "90px";
      OpenFilterRef.current.style.borderBottom = "none";

      SearchCircleRef.current.style.minWidth = "47px";
      SearchCircleRef.current.style.maxWidth = "47px";
      SearchCircleRef.current.style.minHeight = "47px";
      SearchCircleRef.current.style.maxHeight = "47px";
    }
  };

  const toggleCountryFilter = () => {
    CountryFilterDivRef.current.style.height = "350px";
    CountryFilterDivRef.current.style.border = " 1px solid #efefef";

    CityFilterDivRef.current.style.height = "0px";
    CityFilterDivRef.current.style.border = "0px solid #ffffff";

    PriceFilterDivRef.current.style.height = "0px";
    PriceFilterDivRef.current.style.border = "0px solid #ffffff";
  };

  function toggleCityFilter() {
    CityFilterDivRef.current.style.height = "350px";
    CityFilterDivRef.current.style.border = " 1px solid #efefef";

    CountryFilterDivRef.current.style.height = "0px";
    CountryFilterDivRef.current.style.border = "0px solid #ffffff";

    PriceFilterDivRef.current.style.height = "0px";
    PriceFilterDivRef.current.style.border = "0px solid #ffffff";
  }

  function togglePriceFilter() {
    PriceFilterDivRef.current.style.height = "350px";
    PriceFilterDivRef.current.style.border = " 1px solid #efefef";

    CountryFilterDivRef.current.style.height = "0px";
    CountryFilterDivRef.current.style.border = "0px solid #ffffff";

    CityFilterDivRef.current.style.height = "0px";
    CityFilterDivRef.current.style.border = "0px solid #ffffff";
  }

  return (
    <>
      <div className={styles.Filtering}>
        <Filters filters={props.filters} admin={false} />

        <button className={styles.FilterandSearchBtn} onClick={toggleFilter}>
          <img src={filterIcon} className={styles.FilterAndSearchIcn} />
        </button>
      </div>
      <div className={styles.OpenFilter} ref={OpenFilterRef}>
        <div className={styles.CircleFilter} ref={CircleFilterRef}>
          <span
            className={styles.CircleFilterSpan}
            onClick={toggleCountryFilter}
          >
            <div className={styles.InputDiv}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="country"
                  autoComplete="off"
                  value={countery}
                  onChange={(event) => setCountry(event.target.value)}
                  className={styles.inputs}
                />
                <label className={styles.label} htmlFor="country">
                  <div className={styles.text}>Country</div>
                </label>
              </div>
            </div>
            <div className={styles.CountryFilterDiv} ref={CountryFilterDivRef}>
              <h4>Search by country</h4>
              <div className={styles.countryIconsDiv}>
                <span>
                  <img
                    src="../public/img/USA_orthographic.svg.png"
                    className={styles.CountryIcon}
                  />
                  USA
                </span>
              </div>
            </div>
          </span>
          |
          <span className={styles.CircleFilterSpan} onClick={toggleCityFilter}>
            <div className={styles.InputDivCity}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="city"
                  value={city}
                  autoComplete="off"
                  onChange={(event) => setCity(event.target.value)}
                  className={styles.inputs}
                />
                <label className={styles.label} htmlFor="city">
                  <div className={styles.text}>City</div>
                </label>
              </div>
            </div>
            <div className={styles.CityFilterDiv} ref={CityFilterDivRef}>
              <div className={styles.cityNameDiv}>
                <h5>- los angeles</h5>
              </div>
            </div>
          </span>
          |
          <span className={styles.CircleFilterSpan} onClick={togglePriceFilter}>
            Price
            <div className={styles.PriceFilterDiv} ref={PriceFilterDivRef}>
              <h4>Search by price</h4>

              <div className={styles.PriceInputsDiv}>
                <div className={styles.InputDiv2}>
                  <div className={styles.inputContainer2}>
                    <input
                      type="text"
                      id="Initialvalue"
                      value={price.firstValue}
                      onChange={(event) => {
                        setPrice((prev) => ({
                          ...prev,
                          firstValue: event.target.value,
                        }));
                      }}
                      className={styles.inputs2}
                    />
                    <label className={styles.label2} htmlFor="Initialvalue">
                      <div className={styles.text2}>Initial value</div>
                    </label>
                  </div>
                </div>
                <div className={styles.InputDiv2}>
                  <div className={styles.inputContainer2}>
                    <input
                      type="text"
                      id="Secondaryvalue"
                      value={price.secondValue}
                      onChange={(event) => {
                        setPrice((prev) => ({
                          ...prev,
                          secondValue: event.target.value,
                        }));
                      }}
                      className={styles.inputs2}
                    />
                    <label className={styles.label2} htmlFor="Secondaryvalue">
                      <div className={styles.text2}>Secondary value</div>
                    </label>
                  </div>
                </div>
                <MultiRangeSlider
                  min={0}
                  max={100}
                  onChange={({ min, max }) =>
                    // console.log(`min = ${min}, max = ${max}`)
                    setPrice({
                      firstValue: min,
                      secondValue: max,
                    })
                  }
                />
              </div>
            </div>
          </span>
          <span
            // onClick="OpenFilterDiv()"
            className={styles.SearchCircle}
            ref={SearchCircleRef}
          >
            <img
              src={whiteSearchIcon}
              className={styles.SearchIcon}
            />
          </span>
        </div>
      </div>
      {filterIsOpen && (
        <div className={styles.OverlayFilter} onClick={toggleFilter}></div>
      )}

      {/* <div className={styles.test}></div> */}
      {/* <div className={styles.FilterandSearch}>
          <div>
            <button
              onClick={props.clickHandlerForFilterShown}
              className={styles.FilterandSearchBtn}
              role="button"
            >
              <img src={filterIcon} className={styles.FilterAndSearchIcn} />
            </button>
          </div>

          <div>
            <button
              onClick={props.clickHandlerForSearchShown}
              className={styles.FilterandSearchBtn}
              role="button"
            >
              <img src={serachIcon} className={styles.FilterAndSearchIcn} />
            </button>
          </div>
        </div> */}

      <br />
    </>
  );
};
export default Preferences;
