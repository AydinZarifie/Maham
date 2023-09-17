import styles from "../../styles/test.module.css";
import nextIcon from "../../images/arrow-sm-right-svgrepo-com.svg";
import { useState } from "react";
const StepOne = (props) => {
  const [address, setAddress] = useState("");

  const eventHandler = (event) => {
    setAddress(event.target.value);
  };
  return (
    <>
      <div className={styles.StepOne}>
        <h3>Connect to platform</h3>
        <div className={styles.InputDiv}>
          <div className={styles.inputContainer3}>
            <input
              disabled
              type="text"
              id="Mint"
              value="123"
              className={styles.AddressInputs}
            />
            <label className={styles.AddressLabel} htmlFor="Mint">
              <div className={styles.AddressText}>Address</div>
            </label>
          </div>
          <button className={styles.ConnectBtn} onClick={props.onConnect}>Connect</button>
        </div>
        <div className={styles.inputContainer4}>
          <input
            type="text"
            id="Address"
            value={address}
            onChange={eventHandler}
            className={styles.AddressInputs}
          />
          <label className={styles.AddressLabel} htmlFor="Address">
            <div className={styles.AddressText}>Address</div>
          </label>
        </div>
        <button className={styles.nextBtn} onClick={props.onNext}>
          Next
          <img src={nextIcon} className={styles.nextIcon} />
        </button>
      </div>
    </>
  );
};

export default StepOne;
