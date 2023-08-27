import styles from "../../../styles/reports.module.css";
import profileIcon from "../../../images/profile-circle-svgrepo-com.svg";

const LockEstate = () => {
  return (
    <div className={styles.TableDiv2}>
      <table className={styles.InfoTable2}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Mint ID</th>
            <th>Country</th>
            <th>City</th>
            <th>Status</th>
            <th>Information</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>beach home in ohaio 678</td>
            <td>99076434</td>
            <td>united state</td>
            <td>california</td>
            <td>
              <div className={styles.rejectDiv}>reject</div>
            </td>
            <td>
              <img className={styles.infoIcon} src={profileIcon} />
            </td>
            <td></td>
          </tr>

          <tr class={styles.alertRow}>
            <td
              colspan="7"
              style={{ padding: "0px", border: "none" }}
              className={styles.AlertTd}
            >
              <div className={styles.AlertDiv}>
                <p>
                  The reason for the rejection of your document is because of...
                  so your document is rejected
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>beach home in ohaio 678</td>
            <td>99076434</td>
            <td>united state</td>
            <td>california</td>
            <td>
              <div className={styles.acceptDiv}>accept</div>
            </td>
            <td>
              <img className={styles.infoIcon} src={profileIcon} />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>beach home in ohaio 678</td>
            <td>99076434</td>
            <td>united state</td>
            <td>california</td>
            <td>
              <div className={styles.pendingDiv}>pending</div>
            </td>
            <td>
              <img className={styles.infoIcon} src={profileIcon} />
            </td>
            <td>
              <button className={styles.cancelBtn}>cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LockEstate;
