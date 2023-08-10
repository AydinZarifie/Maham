import styles from "../../../styles/adminEstates.module.css";

import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const SellPosition = () => {
  const { sellPositionData, fetchSellPositionData } = useOutletContext();

  useEffect(() => {
    fetchSellPositionData();
  }, []);

  return (
    <div class={styles.Sell}>
      <table className={styles.GLStable}  cellpadding="0" cellspacing="0">
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
            <th>Sell position</th>
          </tr>
        </thead>
        <tbody>
          {sellPositionData.map((item) => (
            <tr>
              <td>{item.estate_title}</td> <td></td>
              <td></td>
              <td>{item.contractAddress}</td>
              <td>{item.landloreAddress}</td>
              <td>{item.country_name}</td>
              <td>{item.city_name}</td>
              <td>{item.maham_price} ETH</td>
              <td>1.36</td>
              <td>true</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellPosition;
