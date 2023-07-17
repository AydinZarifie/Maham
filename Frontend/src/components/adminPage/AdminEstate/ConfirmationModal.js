import styles from "../../../styles/AdminPanel.module.css";
import overlayStyles from "../../../styles/overlay.module.css";

import { useState } from "react";

const ConfirmationModal = (props) => {
  const [verification, setVerification] = useState("");
 
  const [touched, setTouched] = useState(false);

  const enteredCodeIsValid = verification.trim().length == 6;

  const codeIsInvalid = !enteredCodeIsValid && verification;

  const eventHandler = (event) => {
    const { value } = event.target;

    if (value.length >= 6) {
      const newValue = value.slice(0, 6);
      setVerification(newValue);
    } else {
      setVerification(value);
    }
  };

  const sendSmsClicked = (event) => {
    event.preventDefault();

    setTouched(true)

    if(!enteredCodeIsValid){
      return;
    }

    props.onSendSmsClick(verification)
  };

  return (
    <>
      <div
        className={overlayStyles.overlay2}
        onClick={props.toggleConfirmationMessage}
      ></div>
      <div className={styles.tick}>
        <button
          onClick={props.toggleConfirmationMessage}
          className={styles.closeBtn2}
        >
          &times;
        </button>
        <div className={styles.TickDiv}>
          <div className={styles.InputAndBtn}>
            <input
              type="text"
              className={styles.VcodeInput}
              onChange={eventHandler}
              value={verification}
            />
            <button className={styles.VCodeBtn} onClick={sendSmsClicked}>
              send code
            </button>
          </div>
          <div className={styles.ConfirmBtnDiv}>
            <button className={styles.ConfirmBtn}>confirm</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
