import styles from "../../styles/alert.module.css"

const Loading = () => {
  return (
    <div className={styles.LoadingDiv}>
      Pending transaction
      <div className={styles.BoxContainer}>
        <div className={styles.LoadingBox}></div>
        <div className={styles.LoadingBox}></div>
        <div className={styles.LoadingBox}></div>
      </div>
    </div>
  );
};

export default Loading;