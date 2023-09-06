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
    const { value } = event.target;
    setData((prev) => ({ ...prev, price: value }));
  };
  return (
    <>
      <div className={styles.SellDiv}>
        <div className={styles.closeSellDiv} onClick={props.closeHandler}>
          &times;
        </div>
        <div className={styles.InputsDiv}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="title"
              value={data.title}
              className={styles.inputs}
              disabled
            />
            <label className={styles.label} htmlFor="title">
              <div className={styles.text}>title</div>
            </label>
          </div>

          {/* <input
            type="text"
            placeholder="Title"
            disabled
            className={styles.SellInput}
            value={data.title}
          /> */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="Mint ID"
              value={data.mintId}
              className={styles.inputs}
              disabled
            />
            <label className={styles.label} htmlFor="Mint ID">
              <div className={styles.text}>Mint ID</div>
            </label>
          </div>
          {/* <input
            type="text"
            placeholder="Mint ID"
            disabled
            className={styles.SellInput}
            value={data.mintId}
          /> */}
        </div>
        <div className={styles.InputsDiv2}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="country"
              value={data.country}
              className={styles.inputs}
              disabled
            />
            <label className={styles.label} htmlFor="country">
              <div className={styles.text}>country</div>
            </label>
          </div>
          {/* <input
            type="text"
            placeholder="Country"
            disabled
            className={styles.SellInput}
            value={data.country}
          /> */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="city"
              value={data.city}
              className={styles.inputs}
              disabled
            />
            <label className={styles.label} htmlFor="city">
              <div className={styles.text}>city</div>
            </label>
          </div>
          {/* <input
            type="text"
            placeholder="City"
            disabled
            className={styles.SellInput}
            value={data.city}
          /> */}
        </div>
        <div className={styles.InputsDiv2}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="city"
              value={data.price}
              className={styles.inputs}
              onChange={eventHandler}
            />
            <label className={styles.label} htmlFor="price">
              <div className={styles.text}>price</div>
            </label>
          </div>
          {/* <input
            type="text"
            placeholder="Price"
            className={styles.SellInput2}
            value={data.price}
            onChange={eventHandler}
          /> */}
        </div>
        <button className={styles.SellBtn} onClick={props.onSubmit}>
          Sell
        </button>
      </div>
      <div className={styles.SellOverlay} onClick={props.closeHandler}></div>
    </>
  );
};

export default SellPanel;
