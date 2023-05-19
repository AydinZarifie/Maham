import styles from "../../styles/Estate.module.css";

import deleteIcon from "../../images/delete-svgrepo-com.svg";
import editIcon from "../../images/edit-svgrepo-com.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ItemInAdmin(props) {
  // const myLoader = ({ src }) => {
  //   return `http://localhost:8080/${props.imageUrl[currentIndex].replace(
  //     /\\/g,
  //     "/"
  //   )}`;
  // };

  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? props.imageUrl.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === props.imageUrl.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={styles.State}>
      <div className={styles.slideshowContainer}>
        <div className={(styles.mySlides, styles.fade)}>
          <img
            // loader={myLoader}
            width={314.68}
            height={314.68}
            // src={`http://localhost:8080/${props.imageUrl[currentIndex].replace(
            //   /\\/g,
            //   "/"
            // )}`}
            className={styles.StateImg}
          />
        </div>

        <a className={styles.prev} onClick={goToPrevious}>
          ❮
        </a>
        <a className={styles.next} onClick={goToNext}>
          ❯
        </a>
      </div>
      <br />
      <div className={styles.DotDiv}>
        <span
          className={`${styles.dot} ${
            currentIndex === 0 ? `${styles.active}` : ""
          }`}
          onClick={() => goToSlide(0)}
        ></span>
        <span
          className={`${styles.dot} ${
            currentIndex === 1 ? `${styles.active}` : ""
          }`}
          onClick={() => goToSlide(1)}
        ></span>
        <span
          className={`${styles.dot} ${
            currentIndex === 2 ? `${styles.active}` : ""
          }`}
          onClick={() => goToSlide(2)}
        ></span>
        <span
          className={`${styles.dot} ${
            currentIndex === 3 ? `${styles.active}` : ""
          }`}
          onClick={() => goToSlide(3)}
        ></span>
      </div>

      <div className={styles.StateInformation}>
        <div className={styles.StateAndCountryName}>
          <div>
            <h3 className={styles.CityName}>{props.cityName}</h3>
          </div>
          <div>
            <h3 className={styles.And}>,</h3>
          </div>
          <div>
            <h3 className={styles.CountryName2}>{props.countryName}</h3>
          </div>
        </div>

        <h4 className={styles.StateView}>{props.stateView}</h4>
        <div className={styles.StatePriceDiv}>
          <div>
            {/* <img src="../public/img/ethereum-svgrepo-com.svg" id="Eth2" /> */}
          </div>
          <div>
            <p className={styles.StatePrice}>{props.price}</p>
          </div>
        </div>
      </div>

      <div className={styles.EditAndDelete}>
        <div>
          <Link to={`/${props.id}`}>
            <button className={styles.EditBtn} role="button">
              <span className={styles.text}>Edit</span>
              <span>
                {/* <img
                src="../public/img/edit-svgrepo-com.svg"
                className={styles.EditIcn}
              /> */}
                <img src={editIcon} className={styles.EditIcn} />
              </span>
            </button>
          </Link>
        </div>
        <div>
          <button className={styles.DeleteBtn} role="button">
            <span className={styles.text}>Delete</span>
            <span>
              {/* <img
                src="../public/img/delete-svgrepo-com.svg"
                className={styles.EditIcn}
              /> */}
              <img src={deleteIcon} className={styles.EditIcn} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
