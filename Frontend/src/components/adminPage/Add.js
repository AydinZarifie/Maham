//!important
//replaced with confingEstate

import { useState } from "react";
import styles from "../../styles/Estate.module.css";

const Add = () => {
  const [information, setInformation] = useState({
    img: [],
    cityName: "",
    countryName: "",
    stateView: "",
    price: "",
  });

  function eventHandler(event) {
    const { name, value } = event.target;
    setInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const imgHandler = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(event.target.files[i]);
    }
    // const images=Array.from(event.target.files)

    setInformation((prev) => ({
      ...prev,
      img: images,
    }));
  };

  const sendDataToServer = async () => {
    let formdata = new FormData();
    formdata.append("cityName", information.cityName);
    formdata.append("countryName", information.countryName);
    formdata.append("stateView", information.stateView);
    formdata.append("price", information.price);
    formdata.append("img", information.img);

    for (let i = 0; i < information.img.length; i++) {
      formdata.append("img", information.img[i]);
    }

    console.log(information);

    const response = await fetch("http://localhost:8080/adminPage/posts", {
      method: "POST",
      body: formdata,
    });
  };

  return (
    <form method="POST" encType="multipart/form-data">
      <div className={styles.Adder}>
        <div className={styles.myDIV}>
          <div className={styles.page}>
            <div className={styles.group}>
              <input
                name="cityName"
                className={styles.TextInput}
                type="text"
                required
                value={information.cityName}
                onChange={eventHandler}
              />
              <span className={styles.highlight}></span>
              <span className={styles.bar}></span>
              <label className={styles.label}>City Name</label>
            </div>

            <div className={styles.group}>
              <input
                name="countryName"
                className={styles.TextInput}
                type="text"
                required
                value={information.countryName}
                onChange={eventHandler}
              />
              <span className={styles.highlight}></span>
              <span className={styles.bar}></span>
              <label className={styles.label}>Country Name</label>
            </div>

            <div className={styles.group}>
              <input
                name="stateView"
                className={styles.TextInput}
                type="text"
                required
                value={information.stateView}
                onChange={eventHandler}
              />
              <span className={styles.highlight}></span>
              <span className={styles.bar}></span>
              <label className={styles.label}>State View</label>
            </div>

            <div className={styles.group}>
              <input
                name="price"
                className={styles.TextInput}
                type="text"
                required
                value={information.price}
                onChange={eventHandler}
              />
              <span className={styles.highlight}></span>
              <span className={styles.bar}></span>
              <label className={styles.label}>Price</label>
            </div>

            <div className={styles.FileInput}>
              {/* {files} */}

              <input
                type="file"
                name="img"
                id="file"
                className={styles.inputfile}
                // value={information.img[0].img}
                onChange={imgHandler}
                multiple
              />
            </div>
            <button
              className={styles.AddToPicture}
              role="button"
              type="button"
              // onClick={() => createNew()}
            >
              Add
            </button>
            <div className={styles.wrapper}>
              <button
                className={styles.SubmitBtn}
                type="button"
                onClick={() => sendDataToServer()}
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Add;
