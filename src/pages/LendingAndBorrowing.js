import styles from "../styles/test.module.css";

import ethIcon from "../images/ethereum-svgrepo-com.svg";
import usdtIcon from "../images/tether-seeklogo.com.svg";
import { useEffect } from "react";

const LendingAndBorrowing = () => {
  const supplyEth = () => {
    console.log("1");
  };

  const supplyUsdt = () => {
    console.log("2");
  };

  const borrowEth = () => {
    console.log("3");
  };

  const borrowUsdt = () => {
    console.log("4");
  };

  // useEffect(() => {}, []);

  return (
    <div className={styles.Row}>
      <div className={styles.column1}>
        <div className={styles.title}>total Assets to supply: 3458 ETH</div>
        <div style={{ borderRadius: "0px" }} className={styles.title}>
          Assets to supply
        </div>

        <div className={styles.TableDiv3}>
          <table className={styles.InfoTable3}>
            <thead>
              <tr>
                <th>Assets</th>
                <th>Wallet balance</th>
                <th>APY</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    height: "25px",
                  }}
                >
                  <img src={ethIcon} className={styles.AssetsIcon} /> ETH
                </td>
                <td>1375 ETH</td>
                <td>3%</td>
                <td>
                  <button className={styles.SupplyBtn} onClick={supplyEth}>
                    Supply
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    height: "25px",
                  }}
                >
                  <img src={usdtIcon} className={styles.AssetsIcon} /> USDT
                </td>
                <td>27758 USDT</td>
                <td>3%</td>
                <td>
                  <button className={styles.SupplyBtn} onClick={supplyUsdt}>
                    Supply
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.column1}>
        <div className={styles.title}>total Assets to borrow: 3458 ETH</div>
        <div style={{ borderRadius: "0px" }} className={styles.title}>
          Assets to borrow
        </div>
        <div className={styles.TableDiv3}>
          <table className={styles.InfoTable3}>
            <thead>
              <tr>
                <th>Assets</th>
                <th>Wallet balance</th>
                <th>APY</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    height: "25px",
                  }}
                >
                  <img src={ethIcon} className={styles.AssetsIcon} /> ETH
                </td>
                <td>1375 ETH</td>
                <td>3%</td>
                <td>
                  <button className={styles.SupplyBtn} onClick={borrowEth}>
                    borrow
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    height: "25px",
                  }}
                >
                  <img src={usdtIcon} className={styles.AssetsIcon} /> USDT
                </td>
                <td>27758 USDT</td>
                <td>3%</td>
                <td>
                  <button className={styles.SupplyBtn} onClick={borrowUsdt}>
                    borrow
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LendingAndBorrowing;
