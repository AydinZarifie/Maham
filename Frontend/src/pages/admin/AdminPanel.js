import styles from "../../styles/AdminPanel.module.css";

import lockLogo from "../../images/password-svgrepo-com.svg";
import editLogo from "../../images/edit-pencil-line-01-svgrepo-com.svg";
import deleteLogo from "../../images/delete-1-svgrepo-com.svg";
import profileLogo from "../../images/profile-circle-svgrepo-com.svg";
import phoneLogo from "../../images/phone-svgrepo-com.svg";
import emailLogo from "../../images/email-8-svgrepo-com.svg";
import cityLogo from "../../images/city-transit-svgrepo-com.svg";
import countryLogo from "../../images/earth-svgrepo-com.svg";

import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import AdminFilter from "../../components/adminPanel/AdminFilter";
import AddAdmin from "../../components/adminPanel/AddAdmin";
import AdminItem from "../../components/adminPanel/AdminItem";
import AdminList from "../../components/adminPanel/AdminList";

const AdminPanel = () => {
  const filter = useRef();
  const overlay = useRef();

  const closeFilter = () => {
    console.log("close");
    console.log(filter);
    filter.current.style.visibility = "hidden";
    overlay.current.style.visibility = "hidden";
  };

  const openFilter = () => {
    console.log("open");
    console.log(filter);
    filter.current.style.visibility = "visible";
    overlay.current.style.visibility = "visible";
  };

  const submitFilterHandler = (name, type, country, city) => {};

  const submitAddAdminHandler = (
    type,
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    city,
    password,
    confirmPassword
  ) => {
    // const response=await fetch ("url")
  };

  return (
    <div className={styles.Main}>
      <AdminFilter
        submitHandler={submitFilterHandler}
        closeHandler={closeFilter}
        openHandler={openFilter}
        ref={filter}
      />
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
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to=""
            end
          >
            <button  className={styles.InfoBtn}>
              Admin
            </button>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="addAdmin"
          >
            <button className={styles.InfoBtn}>Import admin</button>
          </NavLink>

          <a>
            <button className={styles.InfoBtn}>Personal</button>
          </a>
        </div>

        <Outlet context={submitAddAdminHandler} />
      </div>

      <div className={styles.overlay} ref={overlay} onClick={closeFilter}></div>
    </div>
  );
};

export default AdminPanel;
