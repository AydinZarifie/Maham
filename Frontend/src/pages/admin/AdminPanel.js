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

  //search
  const submitFilterHandler = async (name, type, country, city) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("adminType", type);
    formData.append("countryName", country);
    formData.append("cityName", city);
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
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    let url = "/admin/auth/signup";

    if (method === "PUT") {
      url = "/admin/auth/signup/" + id;
    }

    let { response } = await fetchInstance(url, {
      method: method,
      body: formData,
    });

    if (response.ok) {
      setError(null);
      // alert("Admin successfully added");
      setAlert(true);
      navigate("/admin/admins");
    }
    if (response.status == 401) {
      setError("Email already exists");
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
        navigate("/admin/admins");
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
          detail="Your work has been successfully completed and your information has been saved"
          closeHandler={() => {
            setAlert(false);
          }}
        />
      )}
      <AdminFilter
        submitHandler={submitFilterHandler}
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
            deleteHandler,
          }}
        />
      </div>

      <div className={styles.overlay} ref={overlay} onClick={closeFilter}></div>
    </div>
  );
};

export default AdminPanel;
