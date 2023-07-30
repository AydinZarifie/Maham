import styles from "../../../styles/AdminPanel.module.css";
import overlayStyles from "../../../styles/overlay.module.css";

import { useState, React, forwardRef, useRef } from "react";

const AdminFilter = forwardRef((props, ref) => {
  const [searchedAdminsShown, setSearchedAdminsShown] = useState(false);
  const filter = useRef(null);

  const [filterData, setFilterData] = useState({
    name: "",
    type: "",
    country: "",
    city: "",
  });

  let debounceTimer;

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
    if (name == "name") {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        props.nameChangeFetchHandler(value);
      }, 500);
    }
    if (name == "country") {
      props.cityFetch(value);
    }
  };

  const clickHandler = (admin) => {
    setSearchedAdminsShown(false);
    setFilterData((prev) => ({ ...prev, name: admin }));
  };

  const toggleFilter = () => {
    if (filter.current.style.maxHeight == "350px") {
      filter.current.style.maxHeight = 0;
    } else {
      filter.current.style.maxHeight = "350px";
    }
  };

  return (
    <>
      <div className={styles.FilterDiv}>
        <button className={styles.FilterBtn2} onClick={props.openHandler}>
          filter
        </button>
        <div className={styles.Filter} ref={ref}>
          <button className={styles.closeBtn} onClick={props.closeHandler}>
            &times;
          </button>

          <form className={styles.searchContainer}>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={filterData.name}
              onChange={eventHandler}
              onClick={() => setSearchedAdminsShown(true)}
              className={`${styles.searchBox} ${styles.searchBar}`}
              placeholder="&#xF002;  |  search admin name"
            />
          </form>

          <div className={styles.FilterBody} ref={filter}>
            <div className={styles.wrapper}>
              {searchedAdminsShown && props.searchedAdmins.length > 0 && (
                <>
                  <div
                    className={overlayStyles.SearchOverlay}
                    onClick={() => setSearchedAdminsShown(false)}
                  ></div>
                  <div className={styles.SearchDiv}>
                    <ul>
                      {props.searchedAdmins.map((admin) => (
                        <li
                          onClick={() =>
                            clickHandler(admin.firstname + " " + admin.lastname)
                          }
                        >
                          {admin.firstname} {admin.lastname}
                        </li>
                      ))}
                      {/* <li onClick={() => clickHandler("hadi")}>
                      <p>hadi rasouli</p>
                    </li> */}
                    </ul>
                  </div>
                </>
              )}

              <div className={styles.title}>Select Admin type</div>
              <div className={styles.box} onChange={eventHandler}>
                <input
                  type="radio"
                  name="type"
                  value="SuperAdmin"
                  id="option1"
                  className={styles.option1}
                />
                <input
                  type="radio"
                  name="type"
                  value="admin"
                  id="option2"
                  className={styles.option2}
                />
                <label htmlFor="option1" className={styles.option1}>
                  <div className={styles.dot}></div>
                  <div className={styles.text}>Super admin</div>
                </label>
                <label htmlFor="option2" className={styles.option2}>
                  <div className={styles.dot}></div>
                  <div className={styles.text}>Admin</div>
                </label>
              </div>
            </div>

            {/*  */}
            <div className={styles.SelectDiv} style={{ marginTop: 0 }}>
              <select
                name="country"
                className={styles.SelectType}
                onChange={eventHandler}
                value={filterData.country}
                style={{ width: "100%" }}
              >
                <option className={styles.SelectOption} value="">
                  Country
                </option>
                {props.countries.map((country) => (
                  <option
                    key={country.country_name}
                    className={styles.SelectOption}
                    value={country.country_name}
                  >
                    {country.country_name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.SelectDiv} style={{ marginTop: 0 }}>
              <select
                name="city"
                className={styles.SelectType}
                onChange={eventHandler}
                value={filterData.city}
                style={{ width: "100%" }}
              >
                <option className={styles.SelectOption} value="">
                  City
                </option>

                {props.cities.length > 0 &&
                  props.cities.map((city) => (
                    <option
                      key={city}
                      className={styles.SelectOption}
                      value={city}
                    >
                      {city}
                    </option>
                  ))}
              </select>
            </div>
            {/*  */}

            <button
              className={styles.FilterBtn}
              type="submit"
              onClick={() =>
                props.submitHandler(
                  filterData.name,
                  filterData.type,
                  filterData.country,
                  filterData.city
                )
              }
            >
              Filter
            </button>
          </div>
        </div>
        {/* <button className={styles.FilterBtn2} onClick={props.openHandler}>
          filter
        </button> */}
        <button onClick={toggleFilter} style={{ zIndex: "99" }}>
          open Filter
        </button>
      </div>
    </>
  );
});

export default AdminFilter;
