import styles from "../../styles/homePage.module.css";

import { useRef } from "react";

import ethLogo from "../../images/ethereum-svgrepo-com.svg";
import image1 from "../../images/2841.jpg";
import image2 from "../../images/4918.jpg";
import image3 from "../../images/5904.jpg";
import likeIcon from "../../images/heart-svgrepo-com.svg";
import filledLikeIcon from "../../images/heart-filled-svgrepo-com.svg";
import bedroomIcon from "../../images/bed-double-svgrepo-com.svg";

const EstateItem = (props) => {
  const rightButton = useRef(null);
  const leftButton = useRef(null);
  const slider = useRef(null);
  const likeRef = useRef();

  const goToRight = () => {
    var scrollx = slider.current.scrollLeft;
    var scrollx2 = slider.current.clientWidth;
    var scrollx3 = slider.current.scrollWidth;

    if (scrollx + scrollx2 >= scrollx3 - 1) {
      // rightButton.current.style.opacity = ".2";
      slider.current.scrollBy({
        left: -slider.current.scrollWidth,
      });
    } else {
      // rightButton.current.style.opacity = "1";
      slider.current.scrollBy({
        left: slider.current.offsetWidth,
      });
    }
  };

  const goToLeft = () => {
    var scrollx = slider.current.scrollLeft;

    if (scrollx > 0) {
      // leftButton.current.style.opacity = "1";
      slider.current.scrollBy({
        left: -slider.current.offsetWidth,
      });
    } else {
      // leftButton.current.style.opacity = ".2";
      slider.current.scrollBy({
        left: slider.current.scrollWidth,
      });
    }
  };

  const onMouseEnter = () => {
    rightButton.current.style.opacity = "1";
    leftButton.current.style.opacity = "1";
    if (props.user == true) {
      likeRef.current.style.opacity = "0.7";
    }
  };

  const onMouseLeave = () => {
    rightButton.current.style.opacity = "0";
    leftButton.current.style.opacity = "0";
    if (props.user == true) {
      likeRef.current.style.opacity = "0";
    }
  };

  // const scrollHandler = () => {
  //   var scrollx = slider.current.scrollLeft;
  //   var scrollx2 = slider.current.clientWidth;
  //   var scrollx3 = slider.current.scrollWidth;
  //   if (scrollx > 0) {
  //     // leftButton.current.style.opacity = "1";
  //   } else {
  //     // leftButton.current.style.opacity = ".2";
  //   }
  //   if (scrollx + scrollx2 >= scrollx3 - 1) {
  //     // rightButton.current.style.opacity = ".2";
  //   } else {
  //     // rightButton.current.style.opacity = "1";
  //   }
  // };

  let likeFill;
  if (props.props.liked) {
    likeFill = "#ff0a0a";
  } else {
    likeFill = "rgba(100, 100, 100, 0.5)";
  }

  let likeStroke;
  if (props.props.liked) {
    likeStroke = "#ff0a0a";
  } else {
    likeStroke = "white";
  }

  return (
    <div
      className={styles.sliderContainer}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        //  onScroll={scrollHandler}
        ref={slider}
        className={styles.slider}
      >
        {props.props.imageUrl.length > 0 &&
          props.props.imageUrl.map((img) => (
            <img
              src={`http://localhost:5000/${img.replace(/\\/g, "/")}`}
              alt=""
              className={styles.slide}
            />
          ))}

        {props.user == true && (
          <svg
            ref={likeRef}
            onClick={() => props.likeHandler(props.props.estate_title)}
            className={styles.LikeIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            ariaHidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              fill: likeFill,
              height: "24px",
              width: "24px",
              stroke: likeStroke,
              strokeWidth: 1.3,
              overflow: "visible",
              zIndex: "99",
            }}
          >
            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
          </svg>
          // <img
          //   ref={likeRef}
          //   onClick={() => props.likeHandler(props.props.estate_title)}
          //   className={styles.LikeIcon}
          //   src={src}
          // />
        )}
        {/* <img src={image1} alt="" className={styles.slide} /> */}
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
            <h3 className={styles.titleH3}>{props.props.estate_title}</h3>
            {/*  */}
            <span className={styles.InfoDiv}>
              <h4 className={styles.titleH3}>_ {props.props.country_name}</h4>

              <h4 className={styles.titleH3}>{props.props.city_name}</h4>
            </span>
            {/*  */}
          </span>

          <span className={styles.InfoDivPM}>
            <h4 className={styles.InfoH4}>P/M:</h4>
            <h4 className={styles.InfoH4}>{props.props.PM}</h4>
          </span>
        </div>
        {/* <span className={styles.InfoDiv}>
          <h4 className={styles.InfoH4}>{props.props.country_name}</h4>
          <h4 className={styles.InfoH4}>|</h4>
          <h4 className={styles.InfoH4}>{props.props.city_name}</h4>
        </span> */}
        {/* <div className={styles.InfoDiv2}> */}
        {/* <span>
            <h4 className={styles.InfoH4}>
              Built {props.props.monthOfBuild} {props.props.yearOfBuild}
            </h4>
          </span>
          <h4 className={styles.InfoH4}>|</h4> */}
        <h4 className={styles.InfoH4Limit65}>
          <img className={styles.BedroomIcon} src={bedroomIcon} />
          <div> 2 bedrooms</div> <div>|</div>
          <div>174 kilimeters dubai sea in the </div>
        </h4>
        <span className={styles.InfoDiv}>
          <h4 className={styles.InfoH4}>Metrage:</h4>
          <h4 className={styles.InfoH4}>
            {props.props.metrage} m<sup>2</sup>
          </h4>
        </span>
        {/* </div> */}
        <span className={styles.InfoDiv}>
          <img src={ethLogo} className={styles.EthIcn2} />
          <h4 className={styles.EthH4}>{props.props.customer_price} ETH</h4>
        </span>
      </div>
    </div>
  );
};

export default EstateItem;
