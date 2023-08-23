// import img1 from "../../images/house-in-takamatsu-fujiwaramuro-architects-japanese-houses-architecture-minimal_dezeen_1704_sq.webp";
// import img2 from "../../images/08_HouseInTakamatsu.jpg";
// import img3 from "../../images/10_HouseInTakamatsu.jpg";
// import img4 from "../../images/05_HouseInTakamatsu.jpg";
// import img5 from "../../images/dezeen_House-in-Takamatsu-by-Yasunari-Tsukada_1sq.webp";

import styles from "../../styles/Details.module.css";

const Gallery = () => {
  return (
    <div className={styles.Gallery}>
      <div className={styles.Pic123}>
        <div className={styles.Pic1}>
          {/* <img src={img1} className={styles.Picture1} /> */}
        </div>
        <div className={styles.Pic23}>
          <div className={styles.Pic2}>
            {/* <img
              src={img2}
              className={`${styles.Pictures} ${styles.Picture2}`}
            /> */}
          </div>
          <div className={styles.Pic3}>
            {/* <img
              src={img3}
              className={`${styles.Pictures} ${styles.Picture3}`}
            /> */}
          </div>
        </div>
      </div>
      <div className={styles.Pic45}>
        <div className={styles.Pic4}>
          {/* <img src={img4} className={`${styles.Pictures} ${styles.Picture4}`} /> */}
        </div>
        <div className={styles.Pic5}>
          {/* <img src={img5} className={styles.Picture5} /> */}

          <div className={styles.ShowAllDiv}>
            <h3 className={styles.ShowAllh3}>Show All</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gallery;
