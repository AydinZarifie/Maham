import styles from "../../styles/homePage.module.css";

import sloganPicture from "../../images/IMG_6584.JPG";
import arrowLogo from "../../images/down-arrow-svgrepo-com.svg";
import { useEffect, useRef, useState } from "react";

const Slogan = () => {
  const [scrolledDown, setScrolledDown] = useState(false);
  const sloganDiv = useRef(null);
  useEffect(() => {
    sloganDiv.current.style.opacity = "1";
    sloganDiv.current.style.top = "100px";
    const handleScroll = () => {
      const size = document.getElementById("container2");

      if (window.scrollY > size.offsetTop) {
        setScrolledDown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {scrolledDown ? null : (
        <div on id="ForHidden" className={styles.ForHidden}>
          <div className={styles.ImgDiv} id="ImgDiv">
            <img src={sloganPicture} className={styles.Image} />
            <div
              id="SloganDiv2"
              ref={sloganDiv}
              className={`${styles.SloganDiv} ${styles.SloganDiv2}`}
            >
              <h1 className={styles.Sloganh1}>
                Maham for everyone everywhere at any time
              </h1>
              <div className={styles.Sloganh4Div}>
                <h4 className={styles.Sloganh4}>
                  Maham Company is developing with the support of the private
                  sector and will soon change the real estate sales process
                </h4>
              </div>
            </div>
          </div>
          <a className={styles.DownA} href="#container2">
            <div className={styles.DownDiv}>
              <img src={arrowLogo} className={styles.DownIcn} />
            </div>
          </a>
        </div>
      )}
    </>
  );
};

export default Slogan;
