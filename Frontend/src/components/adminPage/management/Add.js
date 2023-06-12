import { useState } from "react";
import styles from "../../../styles/Management.module.css";

const Add = (props) => {
  const [information, setInformation] = useState({
    countryName: "",
    cityName: "",
    dropBox: "",
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
      <div className={styles.blocker}></div>
      <div className={styles.AddCityCountry}>
        <div className={styles.AddCountry}>
          <div className={styles.wrapper}>
            {/*  */}

            <select
              value={information.dropBox}
              onChange={inputHandler}
              name="dropBox"
            >
              <option value="">Choose an option</option>
              {/* {props.countries.map((country)=>(<option value={country}>{country}</option>))} */}
              <option value="Add country">Add country</option>
            </select>

            {information.dropBox == "Add country" && (
              <>
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
                <div className={styles.ImgAploader}>
                  <h3>Image Aploader</h3>
                  <form className={styles.AploadDiv}>
                    <input type="file" id="file-input" onChange={imgHandler} />
                  </form>
                  <div
                    id="preview-container"
                    className={styles.previewContainer}
                  >
                    {preview && (
                      <img className={styles.imageInput} src={preview} />
                    )}
                  </div>
                </div>
              </>
            )}

            {/*  */}
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
            Apload
          </button>
        </div>
        <div className={styles.AddCity}>
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
        </div>
      </div>
    </div>
  );
};

export default Add;
