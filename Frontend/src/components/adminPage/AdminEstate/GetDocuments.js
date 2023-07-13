import styles from "../../../styles/adminEstates.module.css";

import ProfileLogo from "../../../images/profile-circle-svgrepo-com.svg"
import TrueLogo from "../../../images/tickGreen-svgrepo-com.svg"
import FalseLogo from "../../../images/wrong-delete-remove-trash-minus-cancel-close-2-svgrepo-com.svg"

const GetDocuments = () => {
  return (
    <div class={styles.getDocument}>
      <div class={styles.GetDocument}>
        <span class={styles.LockSpan}>
          <h4 class={styles.MintId}>909977</h4>

          <h4 class={styles.ContryAndCityP}>Iran</h4>
          <h4 class={styles.ContryAndCityP}>Tabriz</h4>
        </span>
        <span class={styles.DocumentSpan}>
          <button class={styles.DocumentBtn}>
            <img
              src={ProfileLogo}
              class={styles.DocumentIcon}
            />
          </button>
          <button class={styles.DocumentBtn}>
            <img
              src={TrueLogo}
              class={styles.DocumentIcon}
            />
          </button>
          <button class={styles.DocumentBtn}>
            <img
              src={FalseLogo}
              class={styles.DocumentIcon}
            />
          </button>
        </span>
      </div>
    </div>
  );
};

export default GetDocuments;
