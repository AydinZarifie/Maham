import { useState } from "react";
import styles from "../styles/test.module.css";

const SellDiv = (props) => {
  const [sellPrice, setSellPrice] = useState("");
  const selectedMintId = props.mintId;

  const sellPriceEventHandler = (event) => {
    setSellPrice(event.target.value);
  };

  return (
    <>
      <div className={styles.SellOverlay} onClick={props.onClose}></div>
      <div className={styles.SellDiv}>
        <div className={styles.CloseSellDiv} onClick={props.onClose}>
          &times;
        </div>
        <div className={styles.inputContainer2}>
          <input
            type="text"
            id="Price"
            value={sellPrice}
            onChange={sellPriceEventHandler}
            className={styles.PriceInputs}
          />
          <label className={styles.PriceLabel} htmlFor="Price">
            <div className={styles.PriceText}>Price</div>
          </label>
        </div>
        <button
          className={styles.SellBtn2}
          onClick={() => props.onSubmit(selectedMintId, sellPrice)}
        >
          Sell
        </button>
      </div>
    </>
  );
};

export default SellDiv;
