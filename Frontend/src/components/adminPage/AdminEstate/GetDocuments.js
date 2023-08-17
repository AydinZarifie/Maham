import styles from "../../../styles/adminEstates.module.css";

import { useOutletContext } from "react-router-dom";

import ProfileLogo from "../../../images/profile-circle-svgrepo-com.svg";
import TrueLogo from "../../../images/tickGreen-svgrepo-com.svg";
import FalseLogo from "../../../images/wrong-delete-remove-trash-minus-cancel-close-2-svgrepo-com.svg";

const GetDocuments = () => {
  const { toggleShowProfile, toggleConfirmationMessage } = useOutletContext();

  return (
    <div className={styles.getDocument}>
      <table className={styles.GLStable} cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th className={styles.Th}>Title</th>
            <th className={styles.Th}>MintId</th>
            <th className={styles.Th}></th>
            <th className={styles.Th}>Country</th>
            <th className={styles.Th}>City</th>
            <th className={styles.Th}>Profile</th>
            <th className={styles.Th}></th>
            <th className={styles.Th}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.Td}>hello world</td>
            <td className={styles.Td}>909977</td>
            <td className={styles.Td}></td>
            <td className={styles.Td}>Iran</td>
            <td className={styles.Td}>Tabriz</td>
            <td className={styles.Td}>
              <button
                className={styles.DocumentBtn}
                onClick={toggleShowProfile}
              >
                <img src={ProfileLogo} className={styles.DocumentIcon} />
              </button>
            </td>
            <td className={styles.Td}>
              <button
                className={styles.DocumentBtn}
                onClick={toggleConfirmationMessage}
              >
                <img src={TrueLogo} className={styles.DocumentIcon} />
              </button>
            </td>
            <td className={styles.Td}>
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
