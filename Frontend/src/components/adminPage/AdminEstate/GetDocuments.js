import styles from "../../../styles/adminEstates.module.css";

import { useOutletContext } from "react-router-dom";

import ProfileLogo from "../../../images/profile-circle-svgrepo-com.svg";
import TrueLogo from "../../../images/tickGreen-svgrepo-com.svg";
import FalseLogo from "../../../images/wrong-delete-remove-trash-minus-cancel-close-2-svgrepo-com.svg";

const GetDocuments = () => {
  const { toggleShowProfile, toggeConfirmationMessage } = useOutletContext();

  return (
    <div className={styles.getDocument}>
      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>MintId</th>
            <th></th>
            <th>Country</th>
            <th>City</th>
            <th>Profile</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>hello world</td>
            <td>909977</td>
            <td></td>
            <td>Iran</td>
            <td>Tabriz</td>
            <td>
              <button
                className={styles.DocumentBtn}
                onClick={toggleShowProfile}
              >
                <img src={ProfileLogo} className={styles.DocumentIcon} />
              </button>
            </td>
            <td>
              <button
                className={styles.DocumentBtn}
                onClick={toggeConfirmationMessage}
              >
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
