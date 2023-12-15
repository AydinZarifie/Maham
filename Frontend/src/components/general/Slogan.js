import styles from "../../styles/homePage.module.css";

import { useEffect, useRef, useState } from "react";

import sloganPicture from "../../images/modern-business-building-scenery-touching-sky.jpg";

const Slogan = () => {
  const sloganDiv = useRef(null);
  useEffect(() => {
    // const size = document.getElementById("container2");
    // const headerId = document.getElementById("headerId");
    // const menuItemsId1 = document.getElementById("menuItemsId1");
    // const menuItemsId2 = document.getElementById("menuItemsId2");
    // const menuItemsId3 = document.getElementById("menuItemsId3");

    // // menuItemsId1.style.color = "white";
    // // menuItemsId2.style.color = "white";
    // // menuItemsId3.style.color = "white";

    // headerId.style.backgroundColor = "transparent";
    // headerId.style.borderBottom = "none";

    if (sloganDiv) {
      sloganDiv.current.style.opacity = "1";
      sloganDiv.current.style.top = "100px";
    }

    // const handleScroll = () => {
    //   if (window.scrollY + 178 > size.offsetTop) {
    //     headerId.style.backgroundColor = "rgb(255, 255, 255)";
    //     headerId.style.borderBottom = " 1px solid rgb(209, 213, 219)";
    //     menuItemsId1.style.color = "#7b7b7b";
    //     menuItemsId2.style.color = "#7b7b7b";
    //     menuItemsId3.style.color = "#7b7b7b";
    //   } else {
    //     headerId.style.backgroundColor = "transparent";
    //     headerId.style.borderBottom = "none";
    //     menuItemsId1.style.color = "white";
    //     menuItemsId2.style.color = "white";
    //     menuItemsId3.style.color = "white";
    //   }
    // };

    // window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
   
    
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
              <a className={styles.GetStartedBtn} href="#container2">
                Get Started
              </a>
            </div>
          </div>
        </div>
     
   
  );
};

export default Slogan;
