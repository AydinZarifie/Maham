import styles from "../../../styles/watchlist.module.css";

const SellPanel = () => {
  return (
    <>
      <div className={styles.SellDiv}>
        <div className={styles.closeSellDiv} onClick="CloseSellDiv()">
          &times;
        </div>
        <div className={styles.InputsDiv}>
          <input
            type="text"
            placeholder="Title"
            disabled
            className={styles.SellInput}
          />
          <input
            type="text"
            placeholder="Mint ID"
            disabled
            className={styles.SellInput}
          />
        </div>
        <div className={styles.InputsDiv2}>
          <input
            type="text"
            placeholder="Title"
            disabled
            className={styles.SellInput}
          />
          <input
            type="text"
            placeholder="Mint ID"
            disabled
            className={styles.SellInput}
          />
        </div>
        <div className={styles.InputsDiv2}>
          <input
            type="text"
            placeholder="Price"
            className={styles.SellInput2}
          />
        </div>
        <button className={styles.SellBtn}>Sell</button>
      </div>
      <div className={styles.SellOverlay} onClick="CloseSellDiv()"></div>
    </>
  );
};

export default SellPanel;
