import styles from "../../../styles/adminEstates.module.css";

import lockLogo from "../../../images/lock-keyhole-svgrepo-com.svg";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import CustomTableItem from "../../general/CustomTableItem";

const LockPosition = () => {
  const { lockPositionData, fetchLockPositionData } = useOutletContext();

  useEffect(() => {
    fetchLockPositionData();
  }, []);

  return (
    <div class={styles.Lock}>
      <table className={styles.GLStable} cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th></th>
            <th></th>
            <th>Contract address</th>
            <th>Landlore address</th>

            <th>Country</th>
            <th>City</th>
            <th>Price</th>
            <th>P/M</th>
            <th>Lock position</th>
          </tr>
        </thead>
        <tbody>
          {lockPositionData.map((item) => (
            <tr>
              <td>{item.estate_title}</td>
              <td></td>
              <td></td> 
              <td></td>
              <td></td>
       {/*        <td>
                <CustomTableItem text={item.contractAddress} />
              </td>
              <td>
                <CustomTableItem text={item.landloreAddress} />
              </td> */}

              <td>{item.country_name}</td>
              <td>{item.city_name}</td>
              <td>{item.maham_price} ETH</td>
              <td>1.96</td>
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
