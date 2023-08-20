import styles from "../../styles/Estate.module.css";
import addStyles from "../../styles/Management.module.css";
import warningIcon from "../../images/warning-attention-red-svgrepo-com.svg";

import { useState } from "react";
import { Link } from "react-router-dom";

import Filters from "../filter/Filters";

export default function FilterWithAdder(props) {
  const [addFilterShown, setAddFilterShown] = useState(false);

  const toggleFilterShown = () => {
    setAddFilterShown((prev) => !prev);
  };

  const [filterName, setFilterName] = useState("");

  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const inputHandler = (event) => {
    const { value } = event.target;
    setFilterName(value);
  };

  const imgHandler = (event) => {
    const selectedImg = event.target.files[0];
    setImg(selectedImg);
    const previewImg = URL.createObjectURL(selectedImg);
    setPreview(previewImg);
  };

  return (
    <div className={styles.CountryFilterAndAdder}>
      <Filters filters={props.filters} admin={true} />
      <div className={styles.FandAButtons}>
        <Link to="new">
          <button className={styles.iconBtn}>Add estate</button>
        </Link>
        <button onClick={toggleFilterShown} className={styles.iconBtn}>
          Add filter
        </button>
      </div>
      {addFilterShown && (
        <>
          <div className={addStyles.overlay} onClick={toggleFilterShown}></div>
          <div className={addStyles.AddCountry} style={{ height: "485px" }}>
            <div className={addStyles.closeBtn} onClick={toggleFilterShown}>
              &times;
            </div>

            {props.error && (
              <div className={styles.errorDiv}>
                <img
                  className={styles.ErrorIcon}
                  src={warningIcon}
                  alt="warning"
                />
                <p>Filter already exist 401 </p>
              </div>
            )}

            <div className={addStyles.wrapper2}>
              <div className={addStyles.wrapper}>
                <div className={addStyles.inputData}>
                  <input
                    type="text"
                    className={addStyles.textinput}
                    name="filterName"
                    required
                    onChange={inputHandler}
                    value={filterName}
                  />
                  <div className={addStyles.underline}></div>
                  <label className={addStyles.label}>Filter name</label>
                </div>
              </div>

              <div className={addStyles.ImgAploader}>
                <h3 className={addStyles.ImageH3}>Image Uploader</h3>
                <form className={addStyles.AploadDiv}>
                  <input type="file" id="file-input" onChange={imgHandler} />
                </form>
                <div
                  id="preview-container"
                  className={addStyles.previewContainer}
                >
                  {preview && (
                    <img className={addStyles.imageInput} src={preview} />
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              className={addStyles.AploadButton}
              onClick={() => props.submitHandler(filterName, img)}
            >
              Upload
            </button>
          </div>
        </>
      )}
    </div>
  );
}
