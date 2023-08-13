import styles from "../../../styles/AdminPanel.module.css";
import overlayStyles from "../../../styles/overlay.module.css";
import arrowIcon from "../../../images/arrow-down-svgrepo-com.svg";
import searchIcon from "../../../images/search-svgrepo-com1.svg";

import { useState, React, forwardRef, useRef, useEffect } from "react";

const AdminFilter = forwardRef((props, ref) => {
  const filter = useRef(null);
  const [moreFilter, setMoreFilter] = useState(false);
  const searchDiv = useRef(null);

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
    // setSearchedAdminsShown(false);
    closeSearchFilter();
    setFilterData((prev) => ({ ...prev, name: admin }));
  };

  const toggleFilter = () => {
    if (filter.current.style.maxHeight == "350px") {
      filter.current.style.maxHeight = 0;
      filter.current.style.top = "40px";
      searchDiv.current.style.marginTop = "-44px";
      searchDiv.current.style.top = "240px";
      setMoreFilter(false);
    } else {
      filter.current.style.maxHeight = "350px";
      filter.current.style.top = "0px";
      setMoreFilter(true);

      searchDiv.current.style.marginTop = "-395px";
      searchDiv.current.style.top = "590px";
    }
  };

  const openSearchFilter = () => {
    searchDiv.current.style.display = "flex";
  };

  const closeSearchFilter = () => {
    searchDiv.current.style.display = "none";
  };

  const handleResize = () => {
    if (window.innerWidth < 750) {
      searchDiv.current.style.display = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              onClick={openSearchFilter}
              className={`${styles.searchBox} ${styles.searchBar}`}
              placeholder="Search admin name"
            />
            <img src={searchIcon} className={styles.SearchIcon} />
          </form>

          <div className={styles.FilterBody} ref={filter}>
            <div className={styles.wrapper}>
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
          <button className={styles.openFilterBtn} onClick={toggleFilter}>
            <img
              src={arrowIcon}
              className={styles.ArrowIcon}
              style={{ rotate: moreFilter ? "180deg" : "" }}
            />
          </button>
        </div>

        <div className={styles.SearchDiv} ref={searchDiv}>
          <div
            className={overlayStyles.SearchOverlay}
            onClick={closeSearchFilter}
          ></div>
          {props.searchedAdmins.length > 0 && (
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
            </ul>
          )}
        </div>
      </div>
    </>
  );
});

export default AdminFilter;
