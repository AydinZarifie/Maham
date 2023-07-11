import styles from "../../styles/homePage.module.css";

import { useEffect, useRef, useState } from "react";

import sloganPicture from "../../images/IMG_6584.JPG";

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
        <div id="ForHidden" className={styles.ForHidden}>
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
        </div>
      )}
    </>
  );
};

export default Slogan;
