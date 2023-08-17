import { useState } from "react";
import styles from "../../../styles/watchlist.module.css";

const SellPanel = (props) => {
  const [data, setData] = useState({
    title: "",
    mintId: "",
    country: "",
    city: "",
    price: "",
  });

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className={styles.SellDiv}>
        <div className={styles.closeSellDiv} onClick={props.closeHandler}>
          &times;
        </div>
        <div className={styles.InputsDiv}>
          <input
            type="text"
            placeholder="Title"
            disabled
            className={styles.SellInput}
            value={data.title}
          />
          <input
            type="text"
            placeholder="Mint ID"
            disabled
            className={styles.SellInput}
            value={data.mintId}
          />
        </div>
        <div className={styles.InputsDiv2}>
          <input
            type="text"
            placeholder="Country"
            disabled
            className={styles.SellInput}
            value={data.country}
          />
          <input
            type="text"
            placeholder="City"
            disabled
            className={styles.SellInput}
            value={data.city}
          />
        </div>
        <div className={styles.InputsDiv2}>
          <input
            type="text"
            placeholder="Price"
            className={styles.SellInput2}
            value={data.price}
            onChange={eventHandler}
          />
        </div>
        <button className={styles.SellBtn} onClick={props.onSubmit}>Sell</button>
      </div>
      <div className={styles.SellOverlay} onClick={props.closeHandler}></div>
    </>
  );
};

export default SellPanel;
