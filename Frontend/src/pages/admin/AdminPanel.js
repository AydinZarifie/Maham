import styles from "../../styles/AdminPanel.module.css";

import lockLogo from "../../images/password-svgrepo-com.svg";
import editLogo from "../../images/edit-pencil-line-01-svgrepo-com.svg";
import deleteLogo from "../../images/delete-1-svgrepo-com.svg";
import profileLogo from "../../images/profile-circle-svgrepo-com.svg";
import phoneLogo from "../../images/phone-svgrepo-com.svg";
import emailLogo from "../../images/email-8-svgrepo-com.svg";
import cityLogo from "../../images/city-transit-svgrepo-com.svg";
import countryLogo from "../../images/earth-svgrepo-com.svg";

import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import AdminFilter from "../../components/adminPanel/AdminFilter";

const AdminPanel = () => {
  const [admins, setAdmins] = useState([]);
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

  const submitFilterHandler = (name, type, country, city) => {};

  const submitAddAdminHandler = async (
    type,
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    city,
    password
  ) => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("password", password);

    const response = await fetch("url", {
      method: "POST",
      body: formData,
    });
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      const data = await fetch("url");
      const json = await data.json();
      setAdmins(json.data);
    };
    fetchAdmins();
  }, []);

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
            <button className={styles.InfoBtn}>Admin</button>
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

        <Outlet context={{submitAddAdminHandler,admins}} />
      </div>

      <div className={styles.overlay} ref={overlay} onClick={closeFilter}></div>
    </div>
  );
};

export default AdminPanel;
