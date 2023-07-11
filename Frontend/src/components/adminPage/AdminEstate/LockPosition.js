import styles from "../../../styles/adminEstates.module.css";

import LockLogo from "../../../images/lock-keyhole-svgrepo-com.svg";

const LockPosition = () => {
  return (
    <div class={styles.Lock}>
      <div class={styles.LockPositin}>
        <span class={styles.LockSpan}>
          <h4 class={styles.InfoP}>Beach home in ohaio 867</h4>
          <h4 class={styles.ContryAndCityP}>Iran</h4>
          <h4 class={styles.ContryAndCityP}>Tabriz</h4>
        </span>
        <img src={LockLogo} class={styles.LockIcon} />
      </div>
    </div>
  );
};

export default LockPosition;
