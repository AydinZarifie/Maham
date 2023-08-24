import { useEffect, useState } from "react";
import styles from "../../../styles/userPanel.module.css";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    const fetchTransactionsData = async () => {
      const response = await fetch("url for data");
      const data = await response.json();
      setTransactionsData(data.data);
    };
    fetchTransactionsData();
  }, []);

  return (
    <>
      {/* for error */}
      {transactionsData.length == 0 && (
        <div className={styles.NoExistDiv}>
          There is no transactions to display for you
        </div>
      )}
      {/*  */}
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
            {transactionsData.length > 0 &&
              transactionsData.map((item) => (
                <tr>
                  <td>{item.mint_id}</td>
                  <td>{item.country_name}</td>
                  <td>{item.city_name}</td>
                  <td>{item.but_price} ETH</td>
                  <td>{item.sell_price} ETH</td>
                  <td>
                    <p className={styles.BenefitGreenP}>
                      {item.benefit_loss} ETH
                    </p>
                  </td>
                  <td>{item.date}</td>
                </tr>
              ))}
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
            {/*  */}
            {/* last two td dosent show up */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/*  */}
          </tbody>
        </table>
      </div>
      <div className={styles.TotalDiv2}>
        <h3 className={styles.TotalH3}>Total:</h3>
        <h3 className={styles.TotalH3}>12508 ETH</h3>
        <h3 className={styles.BenefitH3}>34500 ETH</h3>
      </div>
    </>
  );
};

export default Transactions;
