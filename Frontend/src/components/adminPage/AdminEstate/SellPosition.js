import styles from "../../../styles/adminEstates.module.css";

import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const SellPosition = () => {
  const { sellPositionData, fetchSellPositionData } = useOutletContext();

  useEffect(() => {
    fetchSellPositionData();
  }, [sellPositionData]);

  return (
    <div class={styles.Sell}>
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
            <th>Sell position</th>
          </tr>
        </thead>
        <tbody>
          {sellPositionData.map((item) => (
            <tr>
              <td>{item.title}</td>
              <td>{item.contractAddress}</td>
              <td>{item.landloreAddress}</td>
              <td></td>
              <td></td>
              <td>{item.country}</td>
              <td>{item.city}</td>
              <td>true</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellPosition;
