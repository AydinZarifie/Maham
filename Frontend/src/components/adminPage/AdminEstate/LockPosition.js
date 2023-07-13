import styles from "../../../styles/adminEstates.module.css";

import img from "../../../images/4918.jpg";
import lockLogo from "../../../images/lock-keyhole-svgrepo-com.svg";

const LockPosition = () => {
  return (
    <div class={styles.Lock}>
      <table cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th></th>
            <th></th>
            <th>Country</th>
            <th>City</th>
            <th>Lock position</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={img} className={styles.EstateImg} />
            </td>
            <td>Beach home in ohaio 867</td>
            <td></td>
            <td></td>
            <td>Iran</td>
            <td>Tabriz</td>

            <td>
              <img src={lockLogo} className={styles.LockIcon} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LockPosition;
