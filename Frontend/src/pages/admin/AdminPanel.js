import styles from "../../styles/AdminPanel.module.css";

import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import AdminFilter from "../../components/adminPage/adminPanel/AdminFilter";

const AdminPanel = () => {
  const [admins, setAdmins] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);
  const filter = useRef();
  const overlay = useRef();
  const navigate = useNavigate();

  const closeFilter = () => {
    filter.current.style.visibility = "hidden";
    overlay.current.style.visibility = "hidden";
  };

  const openFilter = () => {
    filter.current.style.visibility = "visible";
    overlay.current.style.visibility = "visible";
  };

  const submitFilterHandler = async (name, type, country, city) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("country", country);
    formData.append("city", city);

    const response = await fetch("", {
      method: "POST",
      body: formData,
    });
  };

  const submitAddAdminHandler = async (
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
    const formData = new FormData();
    formData.append("adminType", type);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    const response = await fetch("http://localhost:5000/admin/auth/signup", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      setError(null);
      alert("Admin successfully added");
      navigate("/admin/admins");
    }
    if (response.status == 401) {
      setError("Email already exists");
    }
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      const data = await fetch("http://localhost:5000/admin/panel/getAdmins");
      const json = await data.json();
      setAdmins(json.data);
    };
    fetchAdmins();

    const fetchCountries = async () => {
      const data = await fetch("http://localhost:5000/admin/managment");
      const json = await data.json();
      console.log(json);
      setCountries(json.data);
    };
    fetchCountries();
  }, []);

  const cityFetch = async (name) => {
    const response = await fetch("url" + name);
    const json = await response.json();
    setCities(json.data);
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

        <Outlet
          context={{
            error,
            submitAddAdminHandler,
            admins,
            countries,
            cityFetch,
            cities,
          }}
        />
      </div>

      <div className={styles.overlay} ref={overlay} onClick={closeFilter}></div>
    </div>
  );
};

export default AdminPanel;
