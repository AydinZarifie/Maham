import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import FilterWithAdder from "../../components/adminPage/FilterWithAdder";
import ItemsInAdmin from "../../components/adminPage/ItemsInAdmin";
import FilterModal from "../../components/general/FilterModal";
import MultiRangeSlider from "../../components/multiRangeSlider/MultiRangeSlider";

import styles from "../../styles/AdminPanel.module.css";
import homePageStyles from "../../styles/homePage.module.css";

import EstateItem from "../../components/general/EstateItem";

//dummy data
// const data = [
//   {
//     id: 1,
//     img: [
//       //../images/square social logo 400 x 400_0.webp  ../images/redelogo.webp
//     ],
//     cityName: "tehran",
//     countryName: "Iran",
//     stateView: "downtown",
//     price: "3.4",
//   },
//   {
//     id: 2,
//     img: [
//       //../images/square social logo 400 x 400_0.webp  ../images/redelogo.webp
//     ],
//     cityName: "tehran",
//     countryName: "Iran",
//     stateView: "downtown",
//     price: "3.4",
//   },
// ];

export default function Estates() {
  const [data, setData] = useState([]);

  const filter = useRef();
  const overlay = useRef();

  const closeFilter = () => {
    filter.current.style.visibility = "hidden";
    overlay.current.style.visibility = "hidden";
  };

  const openFilter = () => {
    filter.current.style.visibility = "visible";
    overlay.current.style.visibility = "visible";
  };

  useEffect(() => {
    fetch("http://localhost:5000/admin/estates")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <FilterWithAdder />
      <div className={styles.overlay} ref={overlay} onClick={closeFilter}></div>
      <div className={styles.Main}>
        <div className={styles.FilterDiv}>
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
        </div>
        <div className={styles.AdminInfo}>
          <div className={styles.Buttons}>
            <a>
              <button
                className={`${styles.InfoBtn} ${styles.Filter3}`}
                onClick={openFilter}
              >
                Filter
              </button>
            </a>
            <NavLink
            className={({ isActive }) =>
              isActive ? styles.active : undefined
            }
            to=""
            end
            >
              <button className={styles.InfoBtn}>Estates</button>
            </NavLink>
            <NavLink
            // className={({ isActive }) =>
            //   isActive ? styles.active : undefined
            // }
            // to="addAdmin"
            >
              <button className={styles.InfoBtn}>Lock position</button>
            </NavLink>

            <NavLink>
              <button className={styles.InfoBtn}>Sell position</button>
            </NavLink>
            <NavLink>
              <button className={styles.InfoBtn}>Get documents</button>
            </NavLink>
          </div>

          {/* <Outlet context={submitAddAdminHandler} /> */}
          <div className={styles.container2}>
            <div className={styles.estateDiv}>
              <EstateItem />
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.estateDiv}>
              <EstateItem />
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.estateDiv}>
              <EstateItem />
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.estateDiv}>
              <EstateItem />
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.estateDiv}>
              <EstateItem />
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.estateDiv}>
              <EstateItem />
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.estateDiv}>
              <EstateItem />
              <button className={styles.editButton}>Edit</button>
            </div>
            <div className={styles.estateDiv}>
              <EstateItem />
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>
        </div>
      </div>

      {/* {data.length > 0 && <ItemsInAdmin data={data} />} */}
    </>
  );
}
