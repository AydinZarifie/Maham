import styles from "../../../styles/reports.module.css";

const GetDocument = () => {
  return (
    <div className={styles.TableDiv2}>
      <table className={styles.InfoTable2}>
        <thead>
          <tr>
            <th>Mint ID</th>
            <th>Country</th>
            <th>City</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Benefit / Loss</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>34879627</td>
            <td>United State</td>
            <td>California</td>
            <td>258900 ETH</td>
            <td>304800 ETH</td>
            <td>
              <p className={styles.BenefitGreenP}>2589 ETH</p>
            </td>
            <td>2024/09/14</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default GetDocument;
