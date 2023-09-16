import StepOne from "../components/bankSystem/StepOne";
import StepThree from "../components/bankSystem/StepThree";
import StepTwo from "../components/bankSystem/StepTwo";
import styles from "../styles/test.module.css";

import { useState } from "react";

const BankSystem = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const connectFunction = () => {
    console.log("connected");
  };

  const setFunction = (address) => {
    console.log(address);
  };

  const completed = () => {
    setCurrentStep(2);
  };

  return (
    <>
      <div className={styles.RoadMap}>
        <hr className={styles.FirstLine} />
        <label
          onClick={() => setCurrentStep(0)}
          htmlFor="Connect"
          className={styles.radio}
        >
          <input
            type="radio"
            id="Connect"
            className={styles.hidden}
            checked={currentStep == 0}
          />

          <span
            className={`${styles.Circle} ${styles.Circle1}`}
            style={{
              border:
                currentStep == 0
                  ? "2px solid #e43d3d"
                  : currentStep == 1
                  ? " 2px solid #e43d3d"
                  : currentStep == 2
                  ? " 2px solid #e43d3d"
                  : "2px solid #e43d3d",
            }}
          >
            <p>Connect</p>
          </span>
        </label>

        <hr
          className={styles.Line1}
          style={{
            backgroundColor:
              currentStep == 0
                ? "#ffffff"
                : currentStep == 1
                ? "#e43d3d"
                : currentStep == 2
                ? "#e43d3d"
                : "#ffffff",
          }}
        />
        <label
          onClick={() => {
            // if (data.agreed) {
            setCurrentStep(1);
            // }
          }}
          htmlFor="Set"
          className={styles.radio}
        >
          <input
            type="radio"
            id="Set"
            className={`${styles.hidden} ${styles.InfoInput}`}
            checked={currentStep == 1}
          />
          <span
            className={`${styles.Circle} ${styles.Circle2}`}
            style={{
              border:
                currentStep == 0
                  ? " 2px solid #ffffff"
                  : currentStep == 1
                  ? " 2px solid #e43d3d"
                  : currentStep == 2
                  ? " 2px solid #e43d3d"
                  : "2px solid #e43d3d",
            }}
          >
            <p>Set</p>
          </span>
        </label>
        <hr
          className={styles.Line2}
          style={{
            backgroundColor:
              currentStep == 0
                ? "#ffffff"
                : currentStep == 1
                ? "#ffffff"
                : currentStep == 2
                ? "#e43d3d"
                : "#ffffff",
          }}
        />

        <label
          onClick={() => {
            // if (data.agreed && data.email.length > 0) {
            setCurrentStep(2);
            // }
          }}
          htmlFor="Succes"
          className={styles.radio}
        >
          <input
            type="radio"
            id="Succes"
            className={`${styles.hidden} ${styles.none}`}
            checked={currentStep == 2}
          />
          <span
            className={`${styles.Circle} ${styles.Circle3}`}
            style={{
              border:
                currentStep == 0
                  ? " 2px solid #ffffff"
                  : currentStep == 1
                  ? "  2px solid #ffffff"
                  : currentStep == 2
                  ? " 2px solid #e43d3d"
                  : "2px solid #e43d3d",
            }}
          >
            <p>Succes</p>
          </span>
        </label>

        <hr
          className={styles.LastLine}
          style={{
            backgroundColor:
              currentStep == 0
                ? "#ffffff"
                : currentStep == 1
                ? "#ffffff"
                : currentStep == 2
                ? "#ffffff"
                : "#ffffff",
          }}
        />
      </div>

      {currentStep === 0 && (
        <StepOne onConnect={connectFunction} onNext={() => setCurrentStep(1)} />
      )}
      {currentStep === 1 && <StepTwo onSet={setFunction} onNext={completed} />}
      {currentStep === 2 && <StepThree />}
    </>
  );
};

export default BankSystem;
