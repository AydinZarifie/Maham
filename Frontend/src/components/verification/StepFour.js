import styles from "../../styles/verification.module.css";

import OTPInput from "react-otp-input";
import { useState } from "react";

import mahamLogo from "../../images/Maham2.png";
import Alert from "../general/Alert";
import trueLogo from "../../images/tick-svgrepo-com_1.svg";
import { useNavigate } from "react-router-dom";

const StepFour = (props) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (otp.length == 6) {
      props.onSubmit(otp);
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.VerificationDiv}>
      {props.alert && (
        <Alert
          lineColor="#0aff0e"
          img={trueLogo}
          title="Success!"
          detail="Your work has been successfully completed and your information has been saved"
          closeHandler={() => {
            navigate("/");
          }}
        />
      )}
      <img src={mahamLogo} className={styles.Logo} />
      <h3>Enter verification code</h3>
      <span>
        <p className={styles.VeriP1}>We've sent a code to</p>
        <p className={styles.VeriP2}>{props.email}</p>
      </span>

      <div className={styles.Container}>
        {/* <div className={styles.inputfield}> */}
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input {...props} style={{}} />}
            inputType="tel"
            // shouldAutoFocus="true"
            containerStyle={styles.inputfield}
            inputStyle={styles.input}
          />
        {/* </div> */}
      </div>

      <a href="#"> Didn't get code ? Click to resend </a>
      <form encType="multipart/form-data">
        <button className={styles.VerifyBtn} onClick={submitHandler}>
          verify
        </button>
      </form>
    </div>
  );
};

export default StepFour;
