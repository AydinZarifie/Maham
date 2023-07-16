import styles from "../../../styles/AdminPanel.module.css";
import overlayStyles from "../../../styles/overlay.module.css";

const ProfileModal = (props) => {
  return (
    <>
      <div className={overlayStyles.overlay2} onClick={props.toggleShowProfile}></div>
      <div className={styles.profile}>
        <button onClick={props.toggleShowProfile} className={styles.closeBtn2}>
          &times;
        </button>
        <div className={styles.prfileDiv}>
          <span className={styles.profileSpan}>
            <h4 className={styles.H4first}>first name:</h4>{" "}
            <h4 className={styles.H4Last}>hadi</h4>
          </span>
          <span className={styles.profileSpan}>
            <h4 className={styles.H4first}>last name:</h4>{" "}
            <h4 className={styles.H4Last}>rasouli</h4>
          </span>
          <span className={styles.profileSpan}>
            <h4 className={styles.H4first}>email:</h4>{" "}
            <h4 className={styles.H4Last}>rasoulihadi101@gmail.com</h4>
          </span>
          <span className={styles.profileSpan}>
            <h4 className={styles.H4first}>number:</h4>{" "}
            <h4 className={styles.H4Last}>09106697563</h4>
          </span>
          <span className={styles.profileSpan}>
            <h4 className={styles.H4first}>country:</h4>{" "}
            <h4 className={styles.H4Last}>iran</h4>
          </span>
          <span className={styles.profileSpan}>
            <h4 className={styles.H4first}>city:</h4>{" "}
            <h4 className={styles.H4Last}>tabriz</h4>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
