import styles from "../../styles/DetailMenu.module.css";
import logo from "../../images/Maham2.png";
import whiteSearchIcon from "../../images/search-white-svgrepo-com.svg";
import { useEffect, useRef, useState } from "react";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";

const DetailMenu = () => {
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [price, setPrice] = useState({
    firstValue: 0,
    secondValue: 1000,
  });
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const CircleFilterRef = useRef();
  const OpenFilterRef = useRef();
  const SearchCircleRef = useRef();
  const headerRef = useRef();

  const [countryH4, setCountryH4] = useState(true);
  const [inputDiv, setInputDiv] = useState(false);
  const [inputDivCity, setInputDivCity] = useState(false);
  const [CityH4, setCityH4] = useState(true);

  const CountryFilterDivRef = useRef();
  const CityFilterDivRef = useRef();
  const PriceFilterDivRef = useRef();

  const openFilter = () => {
    setFilterIsOpen(true);
    setInputDiv(true);
    setCountryH4(false);
    setInputDivCity(true);
    setCityH4(false);

    headerRef.current.style.height = "145px";
    headerRef.current.style.borderBottom = "none";

    CircleFilterRef.current.style.width = "100%";
    CircleFilterRef.current.style.height = "52px";
    CircleFilterRef.current.style.fontSize = "1rem";

    OpenFilterRef.current.style.position = "absolute";
    OpenFilterRef.current.style.borderBottom = "none";
    OpenFilterRef.current.style.top = "80px";
    OpenFilterRef.current.style.width = "70%";

    SearchCircleRef.current.style.minWidth = "47px";
    SearchCircleRef.current.style.maxWidth = "47px";
    SearchCircleRef.current.style.minHeight = "47px";
    SearchCircleRef.current.style.maxHeight = "47px";
  };

  const closeFilter = () => {
    setFilterIsOpen(false);
    setCountryH4(true);
    setInputDiv(false);
    setCityH4(true);
    setInputDivCity(false);

    headerRef.current.style.height = "65.8px";
    headerRef.current.style.borderBottom = "1px solid rgb(209, 213, 219)";

    CircleFilterRef.current.style.width = "320px";
    CircleFilterRef.current.style.height = "40px";
    CircleFilterRef.current.style.fontSize = ".9rem";

    OpenFilterRef.current.style.top = "7px";
    OpenFilterRef.current.style.position = "relative";
    OpenFilterRef.current.style.borderBottom = "none";

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
  };

  const toggleCountryFilter = () => {
    openFilter();
    CountryFilterDivRef.current.style.height = "350px";
    CountryFilterDivRef.current.style.border = " 1px solid #efefef";

    CityFilterDivRef.current.style.height = "0px";
    CityFilterDivRef.current.style.border = "0px solid #ffffff";

    PriceFilterDivRef.current.style.height = "0px";
    PriceFilterDivRef.current.style.border = "0px solid #ffffff";
  };

  function toggleCityFilter() {
    openFilter();
    CityFilterDivRef.current.style.height = "350px";
    CityFilterDivRef.current.style.border = " 1px solid #efefef";

    CountryFilterDivRef.current.style.height = "0px";
    CountryFilterDivRef.current.style.border = "0px solid #ffffff";

    PriceFilterDivRef.current.style.height = "0px";
    PriceFilterDivRef.current.style.border = "0px solid #ffffff";
  }

  function togglePriceFilter() {
    openFilter();
    PriceFilterDivRef.current.style.height = "350px";
    PriceFilterDivRef.current.style.border = " 1px solid #efefef";

    CountryFilterDivRef.current.style.height = "0px";
    CountryFilterDivRef.current.style.border = "0px solid #ffffff";

    CityFilterDivRef.current.style.height = "0px";
    CityFilterDivRef.current.style.border = "0px solid #ffffff";
  }

  let counter = 0;

  const handleScroll = () => {
    counter++;
    if (counter == 60) {
      closeFilter();
      counter=0;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.Header} ref={headerRef}>
        <div className={styles.HeaderBody}>
          <div className={styles.LogoDiv}>
            <a className={styles.Maham}>
              <span className={styles.LogoAndTitle}>
                <img className={styles.Logo} src={logo} />
                <h1 className={styles.Title}>MAHAM</h1>
              </span>
            </a>
          </div>

          <div className={styles.OpenFilter} ref={OpenFilterRef}>
            <div className={styles.CircleFilter} ref={CircleFilterRef}>
              <span
                className={styles.CircleFilterSpan}
                onClick={toggleCountryFilter}
              >
                {countryH4 && <h4 class={styles.CountryH4}>Country</h4>}

                {inputDiv && (
                  <div className={styles.InputDiv}>
                    <div className={styles.inputContainer}>
                      <input
                        type="text"
                        id="country"
                        autoComplete="off"
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        className={styles.inputs}
                      />
                      <label className={styles.label} htmlFor="country">
                        <div className={styles.text}>Country</div>
                      </label>
                    </div>
                  </div>
                )}

                <div
                  className={styles.CountryFilterDiv}
                  ref={CountryFilterDivRef}
                >
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
              <span
                className={styles.CircleFilterSpan}
                onClick={toggleCityFilter}
              >
                {CityH4 && <h4 className={styles.CityH4}>City</h4>}

                {inputDivCity && (
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
                )}

                <div className={styles.CityFilterDiv} ref={CityFilterDivRef}>
                  <div className={styles.cityNameDiv}>
                    <h5>- los angeles</h5>
                  </div>
                </div>
              </span>
              |
              <span
                className={styles.CircleFilterSpan}
                onClick={togglePriceFilter}
              >
                <h4>Price</h4>
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
                        <label
                          className={styles.label2}
                          htmlFor="Secondaryvalue"
                        >
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
                className={styles.SearchCircle}
                ref={SearchCircleRef}
                onClick={openFilter}
              >
                <img src={whiteSearchIcon} className={styles.SearchIcon} />
              </span>
            </div>
          </div>

          <div className={styles.ButtonDiv}>
            <button className={styles.NeedHelpBtn}>Need Help</button>
            <button className={styles.LogInBtn}>Log In</button>
          </div>
        </div>
      </div>
      {filterIsOpen && (
        <div className={styles.OverlayFilter} onClick={closeFilter}></div>
      )}
    </>
  );
};

export default DetailMenu;
