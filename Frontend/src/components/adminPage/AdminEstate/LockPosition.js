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
            <th className={styles.Th}>Title</th>
            <th className={styles.Th}></th>
            <th className={styles.Th}></th>
            <th className={styles.Th}>Contract address</th>
            <th className={styles.Th}>Landlore address</th>

            <th className={styles.Th}>Country</th>
            <th className={styles.Th}>City</th>
            <th className={styles.Th}>Price</th>
            <th className={styles.Th}>P/M</th>
            <th className={styles.Th}>Lock position</th>
          </tr>
        </thead>
        <tbody>
          {lockPositionData.map((item) => (
            <tr>
              <td className={styles.Td}>{item.estate_title}</td>
              <td className={styles.Td}></td>
              <td className={styles.Td}></td>
              <td className={styles.Td}>
                className={styles.Td}
                <CustomTableItem text={item.contract_address} />
              </td>
              <td className={styles.Td}>
                <CustomTableItem text={item.landlor_address} />
              </td>

              <td className={styles.Td}>{item.country_name}</td>
              <td className={styles.Td}>{item.city_name}</td>
              <td className={styles.Td}>{item.maham_price} ETH</td>
              <td className={styles.Td}>1.96</td>
              <td className={styles.Td}>
                <img src={lockLogo} className={styles.LockIcon} />
              </td>
            </tr>
          ))}
          {/* <tr>
              <td className={styles.Td}>beach home in ohaio 9877</td>
              <td className={styles.Td}></td>
              <td className={styles.Td}></td>
              <td className={styles.Td}>
                <CustomTableItem text="86966696969908696669696990989676" />
              </td>
              <td className={styles.Td}>
                <CustomTableItem text="86966696969908696669696990989676" />
              </td>

              <td className={styles.Td}>united state</td>
              <td className={styles.Td}>los angeles</td>
              <td className={styles.Td}>89800808 ETH</td>
              <td className={styles.Td}>1.96</td>
              <td className={styles.Td}>
                <img src={lockLogo} className={styles.LockIcon} />
              </td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default LockPosition;
