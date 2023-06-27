import { useEffect, useState } from "react";
import Add from "../../components/adminPage/management/Add";
import CountryInformations from "../../components/adminPage/management/CountryInformations";
import EstateTable from "../../components/adminPage/management/EstateTable";
import Gainers from "../../components/adminPage/management/Gainers";
import HighestVolumes from "../../components/adminPage/management/HighestVolumes";

import styles from "../../styles/Management.module.css";

const ManagementPage = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const cityFetch=async()=>{
    const data=await fetch("url");
    setCities(data);
  }

  const [addShown, setAddShown] = useState(false);
  const showAddHandler = () => {
    setAddShown((prev) => !prev);
  };

  const submitHandler = async (cityName, countryName, img) => {
    const formData = new FormData();

    formData.append("countryName", countryName);
    formData.append("cityName", cityName);
    formData.append("images", img);

    const response = await fetch("http://localhost:5000/admin/managment/addCountry", {
      method: "POST",
      body: formData,
    });

    showAddHandler();
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      const data = await fetch("http://localhost:5000/admin/managment");
      const json = await data.json();

      setCountries(json)
    };

    fetchCountryData();
  },[]);

  return (
    <>
      {console.log(countries)}
      <div className={styles.Tables}>
        <div className={styles.Tables12}>
          <HighestVolumes />
          <Gainers />
        </div>
        <CountryInformations
          buttonHandler={showAddHandler}
          // countries={countries}
        />
      </div>
      <select onChange={cityFetch}>
        { countries.length >0 && countries.map((country)=>(
        <option value={country.country_name}>{country.country_name}</option>
        ))}
      </select>
      <select >
        {cities.length >0 && cities.map((city)=>(<option value={city}>{city}</option>))}
      </select>
      {addShown && <Add submitHandler={submitHandler} countries={countries} />}
      <EstateTable />
    </>
  );
};

export default ManagementPage;
