//building by order of the peaky blinders 

import { useState } from "react";
import { useEffect } from "react";

const Profile = () => {
  const [data, setData] = useState({
    firstName:'',
    lastName:''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await fetch("url");
      const json = await data.json();
      setCountries(json.data);
    };
    fetchUserData();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
};

export default Profile;
