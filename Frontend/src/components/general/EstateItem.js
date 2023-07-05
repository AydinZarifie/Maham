import styles from "../../styles/homePage.module.css";

import ethLogo from "../../images/ethereum-svgrepo-com.svg";
import { useRef } from "react";

import image1 from "../../images/2841.jpg";
import image2 from "../../images/4918.jpg";
import image3 from "../../images/5904.jpg";

const EstateItem = (props) => {
  const rightButton = useRef(null);
  const leftButton = useRef(null);
  const slider = useRef(null);

  const goToRight = () => {
    slider.current.scrollBy({
      left: slider.current.offsetWidth,
    });
  };

  const goToLeft = () => {
    slider.current.scrollBy({
      left: -slider.current.offsetWidth,
    });
  };

  const scrollHandler = () => {
    var scrollx = slider.current.scrollLeft;
    var scrollx2 = slider.current.clientWidth;
    var scrollx3 = slider.current.scrollWidth;
    if (scrollx > 0) {
      leftButton.current.style.opacity = "1";
    } else {
      leftButton.current.style.opacity = ".2";
    }
    if (scrollx + scrollx2 >= scrollx3) {
      rightButton.current.style.opacity = ".2";
    } else {
      rightButton.current.style.opacity = "1";
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div onScroll={scrollHandler} ref={slider} className={styles.slider}>
        <img src={image1} alt="" className={styles.slide} />
        <img src={image2} alt="" className={styles.slide} />
        <img src={image3} alt="" className={styles.slide} />
        <div className={styles.buttons}>
          <button
            className={`${styles.RLBtn} ${styles.Right}`}
            onClick={goToLeft}
            ref={leftButton}
          >
            ❮
          </button>
          <button
            className={styles.RLBtn}
            onClick={goToRight}
            ref={rightButton}
          >
            ❯
          </button>
        </div>
      </div>

      <div className={styles.Info}>
        <div className={styles.PMDiv}>
          <span className={styles.TitleSpan}>
            <h3 className={styles.titleH3}>Bech home in ohaio 369</h3>
          </span>
          <span className={styles.InfoDivPM}>
            <h4 className={styles.InfoH4}>P/M:</h4>
            <h4 className={styles.InfoH4}>0.014</h4>
          </span>
        </div>
        <span className={styles.InfoDiv}>
          <h4 className={styles.InfoH4}>Iran</h4>
          <h4 className={styles.InfoH4}>|</h4>
          <h4 className={styles.InfoH4}>Tabriz</h4>
        </span>
        <div className={styles.InfoDiv2}>
          <span>
            <h4 className={styles.InfoH4}>Built April 2021</h4>
          </span>
          <h4 className={styles.InfoH4}>|</h4>
          <span className={styles.InfoDiv}>
            <h4 className={styles.InfoH4}>Metrage:</h4>
            <h4 className={styles.InfoH4}>
              132 m<sup>2</sup>
            </h4>
          </span>
        </div>
        <span className={styles.InfoDiv}>
          <img src={ethLogo} className={styles.EthIcn2} />
          <h4 className={styles.EthH4}>1000 ETH</h4>
        </span>
      </div>
    </div>
  );
};

export default EstateItem;
