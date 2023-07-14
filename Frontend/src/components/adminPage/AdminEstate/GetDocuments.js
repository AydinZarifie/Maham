import styles from "../../../styles/adminEstates.module.css";

import ProfileLogo from "../../../images/profile-circle-svgrepo-com.svg";
import TrueLogo from "../../../images/tickGreen-svgrepo-com.svg";
import FalseLogo from "../../../images/wrong-delete-remove-trash-minus-cancel-close-2-svgrepo-com.svg";

const GetDocuments = () => {
  return (
    <div class={styles.getDocument}>
      <table cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>MintId</th>
            <th>Country</th>
            <th>City</th>
            <th>Profile</th>
            <th>Lock position</th>
            <th>Lock position</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>909977</td>
            <td>Iran</td>
            <td>Tabriz</td>
            <td>
              <button className={styles.DocumentBtn}>
                <img src={ProfileLogo} className={styles.DocumentIcon} />
              </button>
            </td>
            <td>
              <button className={styles.DocumentBtn}>
                <img src={TrueLogo} className={styles.DocumentIcon} />
              </button>
            </td>
            <td>
              <button className={styles.DocumentBtn}>
                <img src={FalseLogo} className={styles.DocumentIcon} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GetDocuments;
