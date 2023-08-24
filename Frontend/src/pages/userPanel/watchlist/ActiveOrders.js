import styles from "../../../styles/watchlist.module.css";

import editIcon from "../../../images/edit-svgrepo-com2.svg";
import deleteIcon from "../../../images/delete-2-svgrepo-com2.svg";
import { useEffect, useState } from "react";

const ActiveOrders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchActiveOrdersData = async () => {
      const response = await fetch("url for active order");
      const data = await response.json();
      setData(data.data);
    };

    fetchActiveOrdersData();
  }, []);

  return (
    <div className={styles.TableDiv2}>
      <table className={styles.InfoTable2}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Mint ID</th>
            <th>Country</th>
            <th>City</th>
            <th>P/M</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr>
                <td>{item.time}</td>
                <td>{item.mint_id}</td>
                <td>{item.country_name}</td>
                <td>{item.city_name}</td>
                <td>{item.PM}</td>
                <td>{item.price}</td>
                <td>
                  <div className={styles.ActionDiv}>
                    <button className={styles.EditBtn}>
                      <img src={editIcon} className={styles.ActionsIcon2} />
                    </button>
                    <button className={styles.DeleteBtn}>
                      <img src={deleteIcon} className={styles.ActionsIcon2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          <tr>
            <td>26.11.2023 - 12:23:10</td>
            <td>92457872</td>
            <td>United State</td>
            <td>California</td>
            <td>.93</td>
            <td>12000 ETH</td>
            <td>
              <div className={styles.ActionDiv}>
                <button className={styles.EditBtn}>
                  <img src={editIcon} className={styles.ActionsIcon2} />
                </button>
                <button className={styles.DeleteBtn}>
                  <img src={deleteIcon} className={styles.ActionsIcon2} />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/*  */}
      {data.length == 0 && (
        <div className={styles.NoExistDiv}>
          There are no active orders to show you
        </div>
      )}

      {/*  */}
    </div>
  );
};

export default ActiveOrders;
