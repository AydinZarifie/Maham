import styles from "../../styles/DetailMenu.module.css";
import logo from "../../images/Maham2.png";
import whiteSearchIcon from "../../images/search-white-svgrepo-com.svg";
import { useState } from "react";

const DetailMenu = () => {
  const [countery, setCountry] = useState();
  const [city, setCity] = useState();
  const [price, setPrice] = useState({
    firstValue: 0,
    secondValue: 1000,
  });


  
  return (
    <>
      <div className={styles.Header}>
        <div className={styles.HeaderBody}>
          <div className={styles.LogoDiv}>
            <a className={styles.Maham}>
              <span className={styles.LogoAndTitle}>
                <img className={styles.Logo} src={logo} />
                <h1 className={styles.Title}>MAHAM</h1>
              </span>
            </a>
          </div>

          <div className={styles.OpenFilter}>
            <div className={styles.CircleFilter}>
              <span
                className={styles.CircleFilterSpan}
                onclick="OpenCountryFilter()"
              >
                <h4 className={styles.CountryH4}>Country</h4>
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
                <div className={styles.CountryFilterDiv}>
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
                onclick="OpenCityFilter()"
              >
                <h4 className={styles.CityH4}>City</h4>
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
                      <div className={styles.text}>Country</div>
                    </label>
                  </div>
                </div>
                <div className={styles.CityFilterDiv}>
                  <div className={styles.cityNameDiv}>
                    <h5>- los angeles</h5>
                  </div>
                </div>
              </span>
              |
              <span
                className={styles.CircleFilterSpan}
                onclick="OpenPriceFilter()"
              >
                <h4>Price</h4>
                <div className={styles.PriceFilterDiv}>
                  <h4>Search by price</h4>

                  <div className={styles.PriceInputsDiv}>
                    <div className={styles.InputDiv2}>
                      <div className={styles.inputContainer2}>
                        <input
                          type="text"
                          id="Initialvalue"
                          value=""
                          className={styles.inputs2}
                        />
                        <label className={styles.label2} for="Initialvalue">
                          <div className={styles.text2}>Initial value</div>
                        </label>
                      </div>
                    </div>

                    <div className={styles.InputDiv2}>
                      <div className={styles.inputContainer2}>
                        <input
                          type="text"
                          id="Initialvalue"
                          value=""
                          className={styles.inputs2}
                        />
                        <label className={styles.label2} for="Initialvalue">
                          <div className={styles.text2}>Secondary value</div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
              <span onclick="OpenFilterDiv()" className={styles.SearchCircle}>
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
      <div className={styles.OverlayFilter} onclick="closeSearch()"></div>
    </>
  );
};

export default DetailMenu;
