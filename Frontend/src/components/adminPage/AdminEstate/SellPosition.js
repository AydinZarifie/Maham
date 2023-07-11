import styles from "../../../styles/adminEstates.module.css";

const SellPosition = () => {
  return (
    <div class={styles.Sell}>
      <div class={styles.LockPositin}>
        <span class={styles.LockSpan}>
          <h4 class={styles.InfoP}>Wooden house in California 564</h4>
          <h4 class={styles.ContryAndCityP}>َAmrica</h4>
          <h4 class={styles.ContryAndCityP}>California</h4>
        </span>
        <span class={styles.LockSpan2}>
          <h4 class={styles.SellPosition}>true</h4>
        </span>
      </div>
    </div>
  );
};

export default SellPosition;
