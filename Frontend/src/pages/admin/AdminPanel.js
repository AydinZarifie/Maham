import styles from "../../styles/AdminPanel.module.css";

import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import trueLogo from "../../images/tick-svgrepo-com_1.svg";

import AdminFilter from "../../components/adminPage/adminPanel/AdminFilter";
import fetchInstance from "../../util/fetchInstance";
import Alert from "../../components/general/Alert";

const AdminPanel = () => {
  const [admins, setAdmins] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchedAdmins, setSearchedAdmins] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
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

  const submitNameFilterHandler = async (name) => {
    const formData = new FormData();
    formData.append("name", name);
    let { response, data } = await fetchInstance("/admin/panel/getAdmin", {
      method: "POST",
      body: formData,
    });
    setAdmins(data.data);
  };

  const submitGeneralFilterHandler = async (type, country, city) => {
    const formData = new FormData();
    if (type) {
      formData.append("adminType", type);
    }
    if (country) {
      formData.append("countryName", country);
    }
    if (city) {
      formData.append("cityName", city);
    }

    let { response, data } = await fetchInstance(
      "/admin/panel/getAdminsWithFilter",
      {
        method: "POST",
        body: formData,
      }
    );
    setAdmins(data.data);
  };

  const submitAddAdminHandler = async (
    method,
    type,
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    city,
    password,
    confirmPassword,
    id
  ) => {
    const formData = new FormData();
    formData.append("adminType", type);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("country", country);
    formData.append("city", city);
    if (password && confirmPassword) {
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
    }

    let url = "/admin/auth/signup";

    if (method === "PUT") {
      url = "/admin/panel/editAdmin/" + id;
    }

    let { response } = await fetchInstance(url, {
      method: method,
      body: formData,
    });

    if (response.ok) {
      setError(null);
      // alert("Admin successfully added");
      setAlert(
        "Your work has been successfully completed and your information has been saved"
      );
      navigate("/admin/admins");
    }
    if (response.status == 401) {
      setError("Email or phone number already exists");
    }
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      let { response, data } = await fetchInstance("/admin/panel/getAdmins");
      setAdmins(data.data);
    };
    fetchAdmins();

    const fetchCountries = async () => {
      let { response, data } = await fetchInstance("/admin/managment");
      setCountries(data.data);
    };
    fetchCountries();
  }, []);

  const cityFetch = async (name) => {
    let { response, data } = await fetchInstance(
      "/admin/managment/getCities/" + name
    );
    setCities(data.data);
  };

  const nameChangeFetch = async (name) => {
    if (name.length > 0) {
      const formData = new FormData();
      name = name.trim();
      formData.append("name", name);
      let { response, data } = await fetchInstance("/admin/panel/searchName", {
        method: "POST",
        body: formData,
      });
      setSearchedAdmins(data.data);
    }
  };

  const deleteHandler = async (id) => {
    const proceed = window.confirm("Are you Sure?");
    if (proceed) {
      const url = "/admin/panel/editAdmin/" + id;

      let { response } = await fetchInstance(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setAlert("Admin deleted successfully");
        // navigate("/admin/admins");
      }
    }
  };

  return (
    <div className={styles.Main}>
      {alert && (
        <Alert
          lineColor="#0aff0e"
          img={trueLogo}
          title="Success!"
          detail={alert}
          closeHandler={() => {
            window.location.reload(true);
          }}
        />
      )}
      <AdminFilter
        submitNameHandler={submitNameFilterHandler}
        submitGeneralHandler={submitGeneralFilterHandler}
        closeHandler={closeFilter}
        openHandler={openFilter}
        ref={filter}
        nameChangeFetchHandler={nameChangeFetch}
        countries={countries}
        cities={cities}
        cityFetch={cityFetch}
        searchedAdmins={searchedAdmins}
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

          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="edit"
            onClick={(event) => event.preventDefault()}
          >
            <button className={styles.InfoBtn}>Personal</button>
          </NavLink>
        </div>

        <Outlet
          context={{
            error,
            submitAddAdminHandler,
            admins,
            countries,
            cityFetch,
            cities,
            deleteHandler,
          }}
        />
      </div>

      <div className={styles.overlay} ref={overlay} onClick={closeFilter}></div>
    </div>
  );
};

export default AdminPanel;
