import styles from "../../../styles/adminEstates.module.css";

import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import CustomTableItem from "../../general/CustomTableItem";

const SellPosition = () => {
  const { sellPositionData, fetchSellPositionData } = useOutletContext();

  useEffect(() => {
    fetchSellPositionData();
  }, []);

  return (
    <div class={styles.Sell}>
      <table className={styles.GLStable} cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th className={styles.Th}>Title</th>
            <th className={styles.Th}></th>
            <th className={styles.Th}></th>
            <th className={styles.ThEsp}>Contract address</th>
            <th className={styles.ThEsp}>Landlore address</th>

            <th className={styles.Th}>Country</th>
            <th className={styles.Th}>City</th>
            <th className={styles.Th}>Price</th>
            <th className={styles.Th}>P/M</th>
            <th className={styles.Th}>Sell position</th>
          </tr>
        </thead>
        <tbody>
          {sellPositionData.map((item) => (
            <tr>
              <td className={styles.Td}>{item.estate_title}</td>
              <td className={styles.Td}></td>
              <td className={styles.Td}></td>
              <td className={styles.TdEsp}>
                <CustomTableItem text={item.contract_address} />
              </td>
              <td className={styles.TdEsp}>
                <CustomTableItem text={item.landlor_address} />
              </td>
              <td className={styles.Td}>{item.country_name}</td>
              <td className={styles.Td}>{item.city_name}</td>
              <td className={styles.Td}>{item.maham_price} ETH</td>
              <td className={styles.Td}>1.36</td>
              <td className={styles.Td}>true</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellPosition;
