import styles from "../../styles/AdminPanel.module.css";
import homePageStyles from "../../styles/homePage.module.css";

import { useEffect, useState } from "react";
import {  NavLink, Outlet,useNavigate } from "react-router-dom";

import FilterWithAdder from "../../components/adminPage/FilterWithAdder";
import FilterModal from "../../components/general/FilterModal";

export default function Estates() {
  const [data, setData] = useState([]);

  const [filterShown, setFilterShown] = useState(false);

  const navigate=useNavigate();

  const toggleFilterShown = () => {
    setFilterShown((prev) => !prev);
  };

  useEffect(() => {
    fetch("http://localhost:5000/admin/estates")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const submitFilterHandler = async (filterName, filterImg) => {
    const formData = new FormData();
    formData.append("filterName", filterName);
    formData.append("filterImage", filterImg);

    const response = await fetch("url", {
      method: "POST",
      body: formData,
    });
    if(response.ok){
      navigate('/admin/estates')
    }
  };

  return (
    <>
      <div className={homePageStyles.Menu} style={{ height: 0 }}>
        {filterShown && <FilterModal toggleFilter={toggleFilterShown} />}
      </div>

      <FilterWithAdder submitHandler={submitFilterHandler} />
      {/* <div className={styles.overlay} ref={overlay} onClick={closeFilter}></div> */}
      <div className={styles.Main}>
        {/* <div className={styles.FilterDiv}>
          <div className={styles.filterEstate} ref={filter}>
            <div className={homePageStyles.modalContentInAdmin}>
              <button className={styles.closeBtn} onClick={closeFilter}>
                &times;
              </button>
              <div
                className={homePageStyles.FilterDiv}
                style={{ margin: " 60px 60px 60px 0px" }}
              >
                <div className={homePageStyles.customSelect}>
                  <select
                    value={data.country}
                    name="country"
                    onChange={eventHandler}
                    className={homePageStyles.CountrySelect}
                  >
                    <option value="">choose a country</option>
                    <option value="IRI">IRI</option>
                    <option value="USA">USA</option>
                    <option value="UAE">UAE</option>
                    <option value="GER">GER</option>
                  </select>
                </div>

                <div className={homePageStyles.customSelect}>
                  <select
                    value={data.city}
                    name="city"
                    onChange={eventHandler}
                    className={homePageStyles.CountrySelect}
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
                  <button className={homePageStyles.SubmitBtn} role="button">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            className={styles.FilterBtn2}
            style={{ marginTop: "-340px" }}
            onClick={openFilter}
          >
            filter
          </button>
        </div> */}
        <div className={styles.AdminInfo} style={{ width: "100%" }}>
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
                style={{ display: "block", background: "#e8e8e8" }}
              >
                Filter
              </button>
            </a>
          </div>

          <Outlet context={{ data }} />
        </div>
      </div>
    </>
  );
}
