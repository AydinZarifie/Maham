import styles from "../../styles/test.module.css";
import nextIcon from "../../images/arrow-sm-right-svgrepo-com.svg";
import { useState } from "react";
const StepTwo = (props) => {
  const [address, setAddress] = useState("");

  const eventHandler = (event) => {
    setAddress(event.target.value);
  };

  return (
    <>
      <div className={styles.StepTwo}>
        <div className={styles.InputAndValue}>
          <div className={styles.InputDiv}>
            <div className={styles.inputContainer3}>
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
            <button
              className={styles.ConnectBtn}
              onClick={() => props.onSet(address)}
            >
              Set
            </button>
          </div>
          <h4>your borrow value:787987 ETH</h4>
        </div>
        <button className={styles.nextBtn} onClick={props.onNext}>
          Next
          <img src={nextIcon} className={styles.nextIcon} />
        </button>
      </div>
    </>
  );
};

export default StepTwo;
