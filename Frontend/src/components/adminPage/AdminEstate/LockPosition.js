import styles from "../../../styles/adminEstates.module.css";

import lockLogo from "../../../images/lock-keyhole-svgrepo-com.svg";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const LockPosition = () => {
  const { lockPositionData, fetchLockPositionData } = useOutletContext();

  useEffect(() => {
    fetchLockPositionData();
  }, [lockPositionData]);

  return (
    <div class={styles.Lock}>
      <table cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Contract address</th>
            <th>Landlore address</th>
            <th></th>
            <th></th>
            <th>Country</th>
            <th>City</th>
            <th>Lock position</th>
          </tr>
        </thead>
        <tbody>
          {lockPositionData.map((item) => (
            <tr>
              <td>{item.title}</td>
              <td>{item.contractAddress}</td>
              <td>{item.landloreAddress}</td>
              <td></td>
              <td></td>
              <td>{item.country}</td>
              <td>{item.city}</td>
              <td>
                <img src={lockLogo} className={styles.LockIcon} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LockPosition;
