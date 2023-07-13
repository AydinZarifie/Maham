//old
import styles from "../styles/Maham.module.css";

import { useState } from "react";

export default function Item(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? props.img.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === props.img.length - 1;
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
          {/* <img
            width={314.68}
            height={314.68}
            src={require(props.img[currentIndex])}
            className={styles.StateImg}
          /> */}
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
            <i id="Eth2"></i>
          </div>
          <div>
            <p className={styles.StatePrice}>{props.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
