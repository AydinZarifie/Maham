import styles from "../../../styles/Management.module.css";

import { useState } from "react";

const Add = (props) => {
  const [information, setInformation] = useState({
    countryName: null,
    cityName: null,
    dropBox: null,
  });

  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInformation((prev) => ({ ...prev, [name]: value }));
  };

  const imgHandler = (event) => {
    const selectedImg = event.target.files[0];
    setImg(selectedImg);
    const previewImg = URL.createObjectURL(selectedImg);
    setPreview(previewImg);
  };

  return (
    <div>
      <div className={styles.overlay} onClick={props.closeHandler}></div>

      <div className={styles.AddCountry}>
        <div className={styles.closeBtn} onClick={props.closeHandler}>
          &times;
        </div>
        <div className={styles.wrapper2}>
          <select
            className={styles.CountrySelect2}
            value={information.dropBox}
            onChange={inputHandler}
            name="dropBox"
          >
            <option value="">Choose an option</option>

            {props.countries.length > 0 &&
              props.countries.map((country) => (
                <option value={country.country_name}>
                  {country.country_name}
                </option>
              ))}
            <option value="Add country">Add country</option>
          </select>

          {information.dropBox == "Add country" && (
            <>
              <div className={styles.wrapper}>
                <div className={styles.inputData}>
                  <input
                    type="text"
                    className={styles.textinput}
                    name="countryName"
                    required
                    onChange={inputHandler}
                    value={information.countryName}
                  />
                  <div className={styles.underline}></div>
                  <label className={styles.label}>CountryName</label>
                </div>
              </div>

              <div className={styles.ImgAploader}>
                <h3 className={styles.ImageH3}>Image Uploader</h3>
                <form className={styles.AploadDiv}>
                  <input
                    style={{ overflow: "hidden" }}
                    type="file"
                    id="file-input"
                    onChange={imgHandler}
                  />
                </form>
                <div id="preview-container" className={styles.previewContainer}>
                  {preview && (
                    <img className={styles.imageInput} src={preview} />
                  )}
                </div>
              </div>
            </>
          )}
          {information.dropBox != "Add country" && (
            <div className={styles.wrapper}>
              <div className={styles.inputData}>
                <input
                  type="text"
                  className={styles.textinput}
                  required
                  onChange={inputHandler}
                  name="cityName"
                  value={information.cityName}
                />
                <div className={styles.underline}></div>
                <label className={styles.label}>CityName</label>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.AploadButton}
          onClick={() =>
            props.submitHandler(
              information.cityName,
              information.dropBox == "Add country"
                ? information.countryName
                : information.dropBox,
              img
            )
          }
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Add;
