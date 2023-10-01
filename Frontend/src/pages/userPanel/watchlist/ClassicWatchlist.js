import styles from "../../../styles/watchlist.module.css";

import arrowDownIcon from "../../../images/arrow-down-svgrepo-com.svg";
import chartIcon from "../../../images/chart-line-up-svgrepo-com.svg";
import buyIcon from "../../../images/shopping-cart-16-svgrepo-com.svg";
import sellIcon from "../../../images/shopping-cart-17-svgrepo-com.svg";
import editIcon from "../../../images/edit-svgrepo-com2.svg";
import deleteIcon from "../../../images/delete-2-svgrepo-com2.svg";

import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import SearchComponent from "../../../components/userPanel/watchList/SearchComponent";
import SellPanel from "../../../components/userPanel/watchList/SellPanel";
import Select from "../../../components/general/Select";
import InformationModal from "../../../components/userPanel/InformationModal";

const ClassicWatchlist = () => {
  const { tutorial } = useOutletContext();

  const navigate = useNavigate();

  const size = 65;

  const [dividerPosition, setDividerPosition] = useState(50);

  const handleDividerDrag = (e) => {
    const newDividerPosition =
      ((e.clientY - size) / (window.innerHeight - size)) * 100;
    setDividerPosition(newDividerPosition);
  };

  const [activeOrderTutorial, setActiveOrderTutorial] = useState(false);
  const [dailyDealsTutorial, setDailyDealsTutorial] = useState(false);

  const [countries, setCountries] = useState([
    { country_name: "iran" },
    { country_name: "UK" },
  ]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);

  const [country, setCountry] = useState("Country");
  const [city, setCity] = useState("City");
  const [search, setSearch] = useState("");
  const [searchedEstates, setSearchedEstates] = useState([]);
  const [sellDiv, setSellDiv] = useState(false);

  const searchEventHandler = (event) => {
    const { value } = event.target;
    setSearch(value);
    nameChangeFetch(value);
  };

  const submitSell = () => {};

  const searchItemSelect = (name) => {
    setSearch(name);
    setSearchedEstates([]);
    submitSearch(name);
  };

  const submitSearch = async (value) => {
    let response = await fetch("url for complete search");
    const data = await response.json();
    setData(data.data);
  };

  const cityFetch = async (name) => {
    let response = await fetch(
      "http://localhost:5000/user/panel/getCities/" + name
    );
    const data = await response.json();
    setCities(data.data);
  };

  const nameChangeFetch = async (name) => {
    if (name.length > 0) {
      const formData = new FormData();
      name = name.trim();
      formData.append("name", name);
      let response = await fetch(
        "http://localhost:5000/user/panel/search/title",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setSearchedEstates(data.data);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        "http://localhost:5000/user/panel/getCountries"
      );
      const data = await response.json();
      setCountries(data.data);
    };

    fetchCountries();

    const fetchWatchlist = async () => {
      const response = await fetch("url for watchlist");
      const data = await response.json();
      setData(data.data);
    };

    fetchWatchlist();
  }, []);

  return (
    <>
      {activeOrderTutorial && (
        <InformationModal
          text=""
          onClose={() => setActiveOrderTutorial(false)}
        />
      )}
      {dailyDealsTutorial && (
        <InformationModal
          text=""
          onClose={() => setDailyDealsTutorial(false)}
        />
      )}

      {sellDiv && (
        <SellPanel
          closeHandler={() => setSellDiv(false)}
          onSubmit={submitSell}
        />
      )}
      <div className={styles.resizableY}>
        <div className={styles.div1} style={{ flex: dividerPosition }}>
          <div className={styles.Header}>
            <div className={styles.FirstPart}>
              <div className={styles.SelectDiv}>
                <Select
                  items={countries.map((item) => item.country_name)}
                  set={(option) => {
                    cityFetch(option);
                    setCountry(option);
                  }}
                  selected={country}
                  style={{
                    background: "rgba(239, 239, 239, 0)",
                    height: "38px",
                    border: "1px solid rgb(198, 196, 196)",
                    borderRadius: "4px",
                    color: "#626262",
                    zIndex: "100",
                    position: "relative",
                    fontSize: "13px",
                    minWidth: "120px",
                  }}
                />
                {/* <div className={styles.dropdown} ref={dropdownRef}>
                  <div
                    className={styles.selection}
                    onClick={toggleCountryDropdown}
                  >
                    <span className={styles.selectedOption}>{country}</span>
                    <img
                      src={arrowDownIcon}
                      className={styles.ArrowIcon1}
                      alt="Arrow"
                      style={
                        countryDropdown ? { transform: "rotate(180deg)" } : {}
                      }
                    />
                  </div>
                  <ul
                    className={`${styles.options} ${
                      countryDropdown ? styles.visible : ""
                    }`}
                  >
                    <li
                      onClick={() => countrySelectEventHandler("United state")}
                    >
                      United state
                    </li>
                  </ul>
                </div> */}

                <Select
                  items={cities}
                  set={(option) => setCity(option)}
                  selected={city}
                  style={{
                    background: "rgba(239, 239, 239, 0)",
                    height: "38px",
                    border: "1px solid rgb(198, 196, 196)",
                    borderRadius: "4px",
                    color: "#626262",
                    zIndex: "100",
                    position: "relative",
                    fontSize: "13px",
                    minWidth: "120px",
                  }}
                />
                {/* <div className={styles.dropdown2} ref={dropdownRef2}>
                  <div
                    className={styles.selection2}
                    onClick={toggleCityDropdown}
                  >
                    <span className={styles.selectedOption2}>{city}</span>
                    <img
                      src={arrowDownIcon}
                      className={styles.ArrowIcon2}
                      alt="Arrow"
                      style={
                        cityDropdown ? { transform: "rotate(180deg)" } : {}
                      }
                    />
                  </div>
                  <ul
                    className={`${styles.options2} ${
                      cityDropdown ? styles.visible2 : ""
                    }`}
                  >
                    <li
                      onClick={() =>
                        citySelectEventHandler("sistan balochestan")
                      }
                    >
                      sistan balochestan
                    </li>
                  </ul>
                </div> */}
              </div>
              <form className={styles.searchContainer}>
                <input
                  type="text"
                  className={styles.searchBox}
                  id="searchBox"
                  placeholder="&#xF002;  Search"
                  style={{ fontFamily: "Arial, FontAwesome" }}
                  value={search}
                  onChange={searchEventHandler}
                />
                {searchedEstates.length > 0 && (
                  <SearchComponent
                    itemSelect={searchItemSelect}
                    items={searchedEstates}
                  />
                )}
              </form>
            </div>
            <div className={styles.PriceDiv}>
              <div className={styles.PriceLittleDiv}>
                <h5 className={styles.PriceInfoH5}>Buy Price:</h5>
                <h5 className={styles.PriceH5}>120000 ETH</h5>
              </div>

              <div className={styles.PriceLittleDiv2}>
                <div className={styles.PMDiv}>
                  <h5 className={styles.PriceInfoH5}>P/M:</h5>
                  <h5 className={styles.PriceH5}>90000 ETH</h5>
                </div>
                <div className={styles.PercentDiv}>
                  <h5 className={styles.PercentH5}>100%</h5>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.TableDiv}>
            <table className={styles.InfoTable}>
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>Mint ID</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Buy price</th>
                  <th>Sell price</th>
                  <th>Lock position</th>
                  <th>P/M</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((item) => (
                    <tr>
                      <td>
                        <div className={styles.ActionDiv}>
                          <img
                            src={chartIcon}
                            className={styles.ActionsIcon}
                            onClick={() => navigate("/userpanel/watchlist")}
                          />
                          <img src={buyIcon} className={styles.ActionsIcon} />
                        </div>
                      </td>
                      <td>{item.mint_id}</td>
                      <td>{item.country_name}</td>
                      <td>{item.city_name}</td>
                      <td>{item.buy_price}</td>
                      <td>{item.sell_price}</td>
                      <td>{item.lock_position}</td>
                      <td>{item.PM}</td>
                    </tr>
                  ))}
                <tr>
                  <td>
                    <div className={styles.ActionDiv}>
                      <img
                        src={chartIcon}
                        className={styles.ActionsIcon}
                        onClick={() => navigate("/userpanel/watchlist")}
                      />
                      <img src={buyIcon} className={styles.ActionsIcon} />
                    </div>
                  </td>
                  <td>92457872</td>
                  <td>United State</td>
                  <td>California</td>
                  <td>12000 ETH</td>
                  <td>50006 ETH</td>
                  <td>True</td>
                  <td>0.96</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.ActionDiv}>
                      <img
                        src={chartIcon}
                        className={styles.ActionsIcon}
                        onClick={() => navigate("/userpanel/watchlist")}
                      />
                      <img
                        src={sellIcon}
                        className={styles.ActionsIcon}
                        onClick={() => setSellDiv(true)}
                      />
                    </div>
                  </td>
                  <td>92457872</td>
                  <td>United State</td>
                  <td>California</td>
                  <td>12000 ETH</td>
                  <td>50008 ETH</td>
                  <td>True</td>
                  <td>0.96</td>
                </tr>
              </tbody>
            </table>
            {/*  */}
            {data.length == 0 && (
              <div className={styles.NoExistDiv}>
                There is no estate to display its information
              </div>
            )}

            {/*  */}
          </div>
        </div>
        {/*  */}
        <div
          className={styles.resizerY}
          style={{ cursor: "row-resize" }}
          onMouseDown={(e) => {
            window.addEventListener("mousemove", handleDividerDrag);
            window.addEventListener("mouseup", () => {
              window.removeEventListener("mousemove", handleDividerDrag);
            });
          }}
        >
          <div className={styles.Circle}>...</div>
        </div>
        {/*  */}

        <div className={styles.div2} style={{ flex: 100 - dividerPosition }}>
          <div className={styles.HeaderBottomDiv}>
            <div className={styles.MenuButtonsDiv2}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.Bottomtab : styles.Bottomtab2
                }
                to=""
                end
                // className={styles.Bottomtab}
              >
                Active order
                {tutorial && <div className={styles.assetsInfo2}   onClick={() => setActiveOrderTutorial(true)} >?</div>}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.Bottomtab : styles.Bottomtab2
                }
                to="dailyDeals"
              >
                Daily deals
                {tutorial && <div className={styles.transactionInfo2}   onClick={() => setDailyDealsTutorial(true)} >?</div>}
              </NavLink>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ClassicWatchlist;
