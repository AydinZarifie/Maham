import styles from "../../styles/AdminPanel.module.css";
import homePageStyles from "../../styles/homePage.module.css";

import { useEffect, useState } from "react";
import { Form, NavLink, Outlet } from "react-router-dom";

import filterIcon from "../../images/filter-alt-2-svgrepo-com (4).svg";

import FilterWithAdder from "../../components/adminPage/FilterWithAdder";
import FilterModal from "../../components/general/FilterModal";
import ProfileModal from "../../components/adminPage/AdminEstate/ProfileModal";
import ConfirmationModal from "../../components/adminPage/AdminEstate/ConfirmationModal";
import fetchInstance from "../../util/fetchInstance";

export default function Estates() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [lockPositionData, setLockPositionData] = useState([]);
  const [sellPositionData, setSellPositionData] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [filterShown, setFilterShown] = useState(false);
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [smsCountdown, setSmsCountdown] = useState(60);
  const [confirmationMessage, setConfirmationMessage] = useState(false);

  const [error, setError] = useState(false);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const cityFetch = async (name) => {
    const response = await fetch("http://localhost:5000/admin/managment/getCities/" + name);
    const json = await response.json();
    setCities(json.data);
  };

  const toggleConfirmationMessage = () => {
    setConfirmationMessage((prev) => !prev);
  };

  const toggleShowProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const toggleFilterShown = () => {
    setFilterShown((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      let { response, data } = await fetchInstance("/admin/estates");
      setData(data);
    };
    fetchData();

    const fetchFilterData = async () => {
      let { response, data } = await fetchInstance("/admin/getFilters");
      setFilters(data.data);
    };
    fetchFilterData();

    const fetchCountries = async () => {
      let { response, data } = await fetchInstance("/admin/managment");
      setCountries(data.data);
    };
    fetchCountries();
  }, []);

  const submitFilterHandler = async (filterName, filterImg) => {
    const formData = new FormData();
    formData.append("filterName", filterName);
    formData.append("images", filterImg);

    let { response } = await fetchInstance("/admin/estates/addFilter", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      window.location.reload(true);
    }
    if (response.status == 401) {
      setError(true);
    }
  };

  const submitFilterSearch = async (country, city, lowPrice, highPrice) => {
    const formData = new FormData();
    formData.append("countryName", country);
    formData.append("cityName", city);
    formData.append("price", lowPrice);
    formData.append("price", highPrice);
    let { response, data } = await fetchInstance("/admin/searchEstateByFilter", {
      method: "POST",
      body: formData,
    });
    setData(data.estate);
    setFilterShown(false);
  };

  const getSmsForDocument = async (code) => {
    try {
      let { response } = await fetchInstance("url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      });

      if (response.ok) {
        setIsSendingSms(true);
        setSmsCountdown(60);

        const countdownInterval = setInterval(() => {
          setSmsCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          setIsSendingSms(false);
        }, 60000);
      }
      if (response.status == 401) {
        // setError("Entered code is invalid");
      }
    } catch (error) {
      console.error("Failed to send SMS!", error);
      // setError(error);
    }
  };

  const GetDocument = async () => {};

  const fetchLockPositionData = async () => {
    let { response, data } = await fetchInstance("/admin/panel/getLockEstates");
    setLockPositionData(data.data);
  };

  const fetchSellPositionData = async () => {
    let { response, data } = await fetchInstance(
      "/admin/panel/getSellPositionEstates"
    );
    setSellPositionData(data.data);
  };

  const submitFilter = async (filterName) => {
    const formData = new FormData();
    formData.append("filterName", filterName);
    let { response, data } = await fetchInstance("/admin/searchEstateByFilterName", {
      method: "POST",
      body: formData,
    });
    if(response.ok){
      setData(data.data)
    }
  };

  return (
    <>
      <div
        className={homePageStyles.Menu}
        style={{ height: 0, border: "none" }}
      >
        {filterShown && (
          <FilterModal
            onSubmit={submitFilterSearch}
            toggleFilter={toggleFilterShown}
            countries={countries}
            cities={cities}
            cityFetch={cityFetch}
          />
        )}
      </div>

      <FilterWithAdder
        filters={filters}
        submitHandler={submitFilterHandler}
        error={error}
        onClick={submitFilter}
      />
      {/* <div className={styles.overlay} ref={overlay} onClick={closeFilter}></div> */}
      <div
        className={styles.Main}
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        {showProfile && <ProfileModal toggleShowProfile={toggleShowProfile} />}
        {confirmationMessage && (
          <ConfirmationModal
            isSendingSms={isSendingSms}
            smsCountdown={smsCountdown}
            toggleConfirmationMessage={toggleConfirmationMessage}
            onSendSmsClick={getSmsForDocument}
          />
        )}

        <div className={styles.AdminInfo} style={{ width: "96%" }}>
          <div className={styles.buttonsDiv}>
            <div className={styles.Buttons} style={{ border: "none" }}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                to=""
                end
              >
                <button className={`${styles.InfoBtn} ${styles.InfoBtn2}`}>
                  Estates
                </button>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                to="LockPosition"
              >
                <button className={`${styles.InfoBtn} ${styles.InfoBtn2}`}>
                  Lock position
                </button>
              </NavLink>

              <NavLink
                to="SellPosition"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <button className={`${styles.InfoBtn} ${styles.InfoBtn2}`}>
                  Sell position
                </button>
              </NavLink>
              <NavLink
                to="GetDocuments"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <button className={`${styles.InfoBtn} ${styles.InfoBtn2}`}>
                  Get documents
                </button>
              </NavLink>
            </div>

            <a>
              <button
                className={`${styles.InfoBtn} ${styles.Filter3} ${styles.InfoBtn2} ${styles.HoverFilter}`}
                onClick={toggleFilterShown}
                style={{
                  display: "flex",
                  background: "#e8e8e8",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Filter
                <img style={{ width: "28px" }} src={filterIcon} alt="filter" />
              </button>
            </a>
          </div>

          <Outlet
            context={{
              data,
              toggleShowProfile,
              toggleConfirmationMessage,
              sellPositionData,
              fetchSellPositionData,
              lockPositionData,
              fetchLockPositionData,
            }}
          />
        </div>
      </div>
    </>
  );
}
