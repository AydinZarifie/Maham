import styles from "../../styles/homePage.module.css";

import { useEffect, useRef, useState } from "react";

import sloganPicture from "../../images/IMG_6584.JPG";

const Slogan = () => {
  const [scrolledDown, setScrolledDown] = useState(false);
  const sloganDiv = useRef(null);
  useEffect(() => {
    const size = document.getElementById("container2");
    const contactUsId = document.getElementById("contactUsId");
    const logInId = document.getElementById("logInId");
    const profileId = document.getElementById("profileId");
    const guideId = document.getElementById("guideId");
    const headerId = document.getElementById("headerId");

    contactUsId.style.opacity = 0;
    headerId.style.backgroundColor = "transparent";
    headerId.style.borderBottom = "none";

    guideId.style.display = "none";

    if (logInId != null) {
      logInId.style.opacity = 0;
    }

    if (profileId != null) {
      profileId.style.opacity = 0;
    }

    sloganDiv.current.style.opacity = "1";
    sloganDiv.current.style.top = "100px";
    const handleScroll = () => {
      if (window.scrollY + 178 > size.offsetTop) {
        setScrolledDown(true);
        contactUsId.style.opacity = 1;

        headerId.style.backgroundColor = "rgb(255, 255, 255)";
        headerId.style.borderBottom = " 1px solid rgb(209, 213, 219)";

        guideId.style.display = "flex";

        if (logInId != null) {
          logInId.style.opacity = 1;
        }

        if (profileId != null) {
          profileId.style.opacity = 1;
        }
      } else {
        contactUsId.style.opacity = 0;

        headerId.style.backgroundColor = "transparent";
        headerId.style.borderBottom = "none";

        guideId.style.display = "none";

        if (logInId != null) {
          logInId.style.opacity = 0;
        }

        if (profileId != null) {
          profileId.style.opacity = 0;
        }
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
