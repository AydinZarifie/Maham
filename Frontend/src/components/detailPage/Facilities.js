import styles from "../../styles/Details.module.css";

import wifiIcon from "../../images/wifi-medium-svgrepo-com.svg";
import parkingIcon from "../../images/parking-svgrepo-com.svg";
import poolIcon from "../../images/pool-svgrepo-com.svg";
import furnitureIcon from "../../images/furniture-svgrepo-com.svg";
import elevatorIcon from "../../images/elevator-1-svgrepo-com.svg";
import gardenIcon from "../../images/wooden-fence-svgrepo-com.svg";
import laundryIcon from "../../images/laundry-svgrepo-com.svg";
import bbqIcon from "../../images/bbq-svgrepo-com.svg";
import gymIcon from "../../images/gym-workout-svgrepo-com.svg";

import trueIcon from "../../images/tick-svgrepo-com.svg"
import falseIcon from "../../images/add-svgrepo-com.svg"

const Facilities = () => {
  return (
    <div className={styles.Facilities}>
      <div>
        <h2>Facilities</h2>
      </div>
      <div className={styles.FacilitiesInfo}>
        <div
          className={`${styles.FacilitiesInformation} ${styles.FacilitiesInformation2}`}
        >
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={wifiIcon}
            />
          </div>
          <div>
            <h5 className={styles.Facilitiesh5}>Wifi</h5>
          </div>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={trueIcon}
            />
          </div>
        </div>
        <div className={styles.FacilitiesInformation}>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={parkingIcon}
            />
          </div>
          <div>
            <h5 className={styles.Facilitiesh5}>Parking</h5>
          </div>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={trueIcon}
            />
          </div>
        </div>
        <div className={styles.FacilitiesInformation}>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={poolIcon}
            />
          </div>
          <div>
            <h5 className={styles.Facilitiesh5}>Pool</h5>
          </div>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={trueIcon}
            />
          </div>
        </div>
        <div className={styles.FacilitiesInformation}>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={furnitureIcon}
            />
          </div>
          <div>
            <h5 className={styles.Facilitiesh5}>Furniture</h5>
          </div>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={trueIcon}
            />
          </div>
        </div>
        <div className={styles.FacilitiesInformation}>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={elevatorIcon}
            />
          </div>
          <div>
            <h5 className={styles.Facilitiesh5}>Elevator</h5>
          </div>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={trueIcon}
            />
          </div>
        </div>
        <div className={styles.FacilitiesInformation}>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={gardenIcon}
            />
          </div>
          <div>
            <h5 className={styles.Facilitiesh5}>Garden</h5>
          </div>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={trueIcon}
            />
          </div>
        </div>
        <div className={styles.FacilitiesInformation}>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={laundryIcon}
            />
          </div>
          <div>
            <h5 className={styles.Facilitiesh5}>Laundry</h5>
          </div>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={trueIcon}
            />
          </div>
        </div>
        <div className={styles.FacilitiesInformation}>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={bbqIcon}
            />
          </div>
          <div>
            <h5 className={styles.Facilitiesh5}>Bbq</h5>
          </div>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={trueIcon}
            />
          </div>
        </div>
        <div
          className={`${styles.FacilitiesInformation} ${styles.FacilitiesInformation3}`}
        >
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={gymIcon}
            />
          </div>
          <div>
            <h5 className={styles.Facilitiesh5}>Gym</h5>
          </div>
          <div>
            <img
              className={styles.FacilitiesIcons}
              src={falseIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
