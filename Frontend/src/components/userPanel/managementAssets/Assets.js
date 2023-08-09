import styles from "../../../styles/userPanel.module.css"

const Assets = () => {
  return (
    <>
      <div className={styles.TableDiv}>
        <table className={styles.InfoTable}>
          <thead>
            <tr>
              <th>Mint ID</th>
              <th>Country</th>
              <th>City</th>
              <th>P/M</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Lock Position</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>34879627</td>
              <td>United State</td>
              <td>California</td>
              <td>0.89</td>
              <td>304800 ETH</td>
              <td>h258900 ETH</td>
              <td>False</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.TotalDiv}>
        <h3>Total:</h3>
        <h3>12508 ETH</h3>
        <h3>3450049 USD</h3>
      </div>
    </>
  );
};

export default Assets;
