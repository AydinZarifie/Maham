import styles from "../../styles/AdminPanel.module.css";
import homePageStyles from "../../styles/homePage.module.css";

import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import filterIcon from "../../images/filter-alt-2-svgrepo-com (4).svg";

import FilterWithAdder from "../../components/adminPage/FilterWithAdder";
import FilterModal from "../../components/general/FilterModal";
import ProfileModal from "../../components/adminPage/AdminEstate/ProfileModal";
import ConfirmationModal from "../../components/adminPage/AdminEstate/ConfirmationModal";

export default function Estates() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [filterShown, setFilterShown] = useState(false);
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [smsCountdown, setSmsCountdown] = useState(60);
  const [confirmationMessage, setConfirmationMessage] = useState(false);

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
      const data = await fetch("http://localhost:5000/admin/estates");
      const json = await data.json();
      setData(json);
    };
    fetchData();

    const fetchFilterData = async () => {
      const data = await fetch("urlForFilters");
      const json = await data.json();
      setFilters(json.data);
    };
    fetchFilterData();
  }, []);

  const submitFilterHandler = async (filterName, filterImg) => {
    const formData = new FormData();
    formData.append("filterName", filterName);
    formData.append("images", filterImg);

    const response = await fetch(
      "http://localhost:5000/admin/estates/addFilter",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      setFilterShown(false);
    }
  };

  const submitFilterSearch = async (country, city, lowPrice, highPrice) => {
    const formData = new FormData();
    formData.append("country", country);
    formData.append("city", city);
    formData.append("lowPrice", lowPrice);
    formData.append("highPrice", highPrice);
    const response = await fetch("url", {
      method: "POST",
      body: formData,
    });
  };

  const getSmsForDocument = async (code) => {
    try {
      const response = await fetch(
        "url",
        {
          method: "POST",
          // mode: "cors",
          // credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
          }),
        },
        { withCredentials: true }
      );

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

  return (
    <>
      <div className={homePageStyles.Menu} style={{ height: 0 }}>
        {filterShown && (
          <FilterModal
            onSubmit={submitFilterSearch}
            toggleFilter={toggleFilterShown}
          />
        )}
      </div>

      <FilterWithAdder filters={filters} submitHandler={submitFilterHandler} />
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
              toggeConfirmationMessage: toggleConfirmationMessage,
            }}
          />
        </div>
      </div>
    </>
  );
}
