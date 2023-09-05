import styles from "../../styles/homePage.module.css";

import { useEffect, useState } from "react";
import EstateItem from "../../components/general/EstateItem";

const Favourites = () => {
  const [data, setData] = useState([]);

  const submitLike = async (title) => {
    // const formData = new FormData();
    // formData.append("title", title);
    // const response = await fetch("url", {
    //   method: "POST",
    //   body: formData,
    // });
    // if(response.ok){
    const updatedEstates = [...data];
    let index = data.findIndex((item) => item.estate_title == title);
    let editedEstate = { ...updatedEstates[index] };
    editedEstate.liked = !editedEstate.liked;
    updatedEstates[index] = editedEstate;
    setData(updatedEstates);
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("url");
      let data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container2} style={{ marginTop: "90px" }}>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <EstateItem props={item} user={true} likeHandler={submitLike} />
        ))}
    </div>
  );
};

export default Favourites;
