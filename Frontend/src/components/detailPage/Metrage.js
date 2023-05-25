import bedroomIcon from "../../images/bed-bedroom-furniture-hotel-sleep-svgrepo-com.svg";
import livingroomIcon from "../../images/livingroom-svgrepo-com.svg";
import kitchenIcon from "../../images/kitchen-room-svgrepo-com.svg";
import bathroomIcon from "../../images/bathroom-svgrepo-com.svg";
import gardenIcon from "../../images/garden-planting-flower-svgrepo-com.svg";
import balconyIcon from "../../images/balcony-svgrepo-com.svg";
import garageIcon from "../../images/garage-svgrepo-com.svg";

import styles from "../../styles/Details.module.css";

const Metrage = () => {
  return (
    <div className={styles.Meterage}>
      <div>
        <h3 className={styles.Meterageh3}>Meterage</h3>
      </div>
      <div>
        <h5 className={styles.Meterageh5}>Click on icons to see photos</h5>
      </div>
      <div className={styles.HomeInformations}>
        <div className={styles.HomeInfo}>
          <div>
            <img src={bedroomIcon} className={styles.MeterageIcons} />
          </div>
          <div>
            <h6 className={styles.HoseCombination}>Bedrooms</h6>
          </div>
          <div className={styles.NumberMeterage}>
            <h6 className={styles.NumberMeterage2}>16 m</h6>
          </div>
          <div className={styles.NumberInformation}>
            <h6 className={styles.NumberInformationh6}>2</h6>
          </div>
        </div>
        <div className={styles.HomeInfo}>
          <div>
            <img src={livingroomIcon} className={styles.MeterageIcons} />
          </div>
          <div>
            <h6 className={styles.HoseCombination}>Livingroom</h6>
          </div>
          <div className={styles.NumberMeterage}>
            <h6 className={styles.NumberMeterage2}>60 m</h6>
          </div>
          <div className={styles.NumberInformation}>
            <h6 className={styles.NumberInformationh6}>1</h6>
          </div>
        </div>
        <div className={styles.HomeInfo}>
          <div>
            <img src={kitchenIcon} className={styles.MeterageIcons} />
          </div>
          <div>
            <h6 className={styles.HoseCombination}>Kitchen</h6>
          </div>
          <div className={styles.NumberMeterage}>
            <h6 className={styles.NumberMeterage2}>38 m</h6>
          </div>
          <div className={styles.NumberInformation}>
            <h6 className={styles.NumberInformationh6}>2</h6>
          </div>
        </div>
        <div className={styles.HomeInfo}>
          <div>
            <img src={bathroomIcon} className={styles.MeterageIcons} />
          </div>
          <div>
            <h6 className={styles.HoseCombination}>Bathroom</h6>
          </div>
          <div className={styles.NumberMeterage}>
            <h6 className={styles.NumberMeterage2}>24 m</h6>
          </div>
          <div className={styles.NumberInformation}>
            <h6 className={styles.NumberInformationh6}>1</h6>
          </div>
        </div>
        <div className={styles.HomeInfo}>
          <div>
            <img src={gardenIcon} className={styles.MeterageIcons} />
          </div>
          <div>
            <h6 className={styles.HoseCombination}>Garden</h6>
          </div>
          <div className={styles.NumberMeterage}>
            <h6 className={styles.NumberMeterage2}>50 m</h6>
          </div>
          <div className={styles.NumberInformation}>
            <h6 className={styles.NumberInformationh6}>1</h6>
          </div>
        </div>
        <div className={styles.HomeInfo}>
          <div>
            <img src={balconyIcon} className={styles.MeterageIcons} />
          </div>
          <div>
            <h6 className={styles.HoseCombination}>Balcony</h6>
          </div>
          <div className={styles.NumberMeterage}>
            <h6 className={styles.NumberMeterage2}>12 m</h6>
          </div>
          <div className={styles.NumberInformation}>
            <h6 className={styles.NumberInformationh6}>2</h6>
          </div>
        </div>
        <div className={styles.HomeInfo}>
          <div>
            <img src={garageIcon} className={styles.MeterageIcons} />
          </div>
          <div>
            <h6 className={styles.HoseCombination}>Garage</h6>
          </div>
          <div className={styles.NumberMeterage}>
            <h6 className={styles.NumberMeterage2}>20 m</h6>
          </div>
          <div className={styles.NumberInformation}>
            <h6 className={styles.NumberInformationh6}>1</h6>
          </div>
        </div>
        <hr className={styles.Meteragehr} />
        <br />
        <div className={styles.Total}>
          <div>
            <h5 className={styles.Totalh5}>Total :</h5>
          </div>
          <div className={styles.NumberMeterage}>
            <h6 className={styles.NumberMeterage2}>220 m</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrage;
