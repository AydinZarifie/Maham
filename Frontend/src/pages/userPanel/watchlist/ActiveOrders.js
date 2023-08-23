import styles from "../../../styles/watchlist.module.css";

import editIcon from "../../../images/edit-svgrepo-com2.svg";
import deleteIcon from "../../../images/delete-2-svgrepo-com2.svg";

const ActiveOrders = () => {
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
      {/* <div className={styles.NoExistDiv}>
        There are no active orders to show you
      </div> */}
      {/*  */}
    </div>
  );
};

export default ActiveOrders;
