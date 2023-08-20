import styles from "../../../styles/AdminPanel.module.css";
import overlayStyles from "../../../styles/overlay.module.css";
import arrowIcon from "../../../images/arrow-down-svgrepo-com.svg";
import searchIcon from "../../../images/search-svgrepo-com1.svg";

import { useState, React, forwardRef, useRef, useEffect } from "react";

const AdminFilter = forwardRef((props, ref) => {
  const filter = useRef(null);
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
    } else if (name == "country") {
      props.cityFetch(value);
      props.submitGeneralHandler(
        filterData.type ? filterData.type : null,
        value,
        filterData.city ? filterData.type : null
      );
    } else if (name == "city") {
      props.submitGeneralHandler(
        filterData.type ? filterData.type : null,
        filterData.country ? filterData.country : null,
        value
      );
    } else if (name == "type") {
      props.submitGeneralHandler(
        value,
        filterData.country ? filterData.country : null,
        filterData.city ? filterData.city : null
      );
    }
  };

  const clickHandler = (admin) => {
    closeSearchFilter();
    setFilterData((prev) => ({ ...prev, name: admin }));
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

  const adminType = useRef();
  const nationality = useRef();
  const arrow1 = useRef();
  const arrow2 = useRef();

  const toggleAdminType = () => {
    if (adminType.current.style.maxHeight == "105px") {
      adminType.current.style.maxHeight = "0px";
      arrow1.current.style.rotate = "0deg";
    } else {
      adminType.current.style.maxHeight = "105px";
      arrow1.current.style.rotate = "180deg";
    }
  };

  const toggleNationality = () => {
    if (nationality.current.style.maxHeight == "85px") {
      nationality.current.style.maxHeight = "0px";
      arrow2.current.style.rotate = "0deg";
    } else {
      nationality.current.style.maxHeight = "85px";
      arrow2.current.style.rotate = "180deg";
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
                      clickHandler(admin.first_name + " " + admin.last_name)
                    }
                  >
                    <p>
                      {admin.first_name} {admin.last_name}
                    </p>
                  </li>
                ))}
                  {/* <li
                    onClick={() =>
                      clickHandler('uiguigh' + " " + 'ohhohohohj')
                    }
                  >
                    <p>
                      nnknknnlnlnlnlnln
                    </p>
                  </li> */}
              </ul>
              )}
          </div>

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
            <img
              src={searchIcon}
              className={styles.SearchIcon}
              onClick={() => props.submitNameHandler(filterData.name)}
            />
          </form>

          <hr className={styles.FilterHr}/>
          <div className={styles.FilterTitleDiv}>
          <p className={styles.filterTitle}>Filter</p>
          <p className={styles.DeleteFilter} onClick={()=>window.location.reload(true)}>Delete filter</p>
          </div>
          <div className={styles.FilterBody} ref={filter}>
            <div className={styles.Selection} onClick={toggleAdminType}>
              Admin Type
              <img
                src={arrowIcon}
                className={styles.LittleArrowIcon}
                ref={arrow1}
              />
            </div>
            <div className={styles.wrapper} ref={adminType}>
              {/* <div className={styles.title}>Select Admin type</div> */}
              <div className={styles.box}>
                <input
                  type="radio"
                  name="type"
                  value="superAdmin"
                  id="option1"
                  onChange={eventHandler}
                  checked={filterData.type === "superAdmin"}
                  className={styles.option1}
                />
                <input
                  type="radio"
                  name="type"
                  value="admin"
                  id="option2"
                  onChange={eventHandler}
                  checked={filterData.type === "admin"}
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

            <div className={styles.Selection2} onClick={toggleNationality}>
              nationality
              <img
                src={arrowIcon}
                className={styles.LittleArrowIcon}
                ref={arrow2}
              />
            </div>
            <div className={styles.nationality} ref={nationality}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default AdminFilter;
