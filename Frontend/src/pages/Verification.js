import styles from "../styles/verification.module.css";

import { useState } from "react";

import StepFour from "../components/verification/StepFour";
import StepThree from "../components/verification/StepThree";
import StepTwo from "../components/verification/StepTwo";
import StepOne from "../components/verification/StepOne";

const Verification = () => {
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState({
    agreed: false,
    gender: "Gender",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    yearOfBirth: "",
    monthOfBirth: "Month",
    dayOfBirth: "",
    email: "",
    phoneNumber: "",
    passportId: "",
    selectedImages: [],
  });

  const [currentStep, setCurrentStep] = useState(0);

  // const handleNext = () => {
  //   if (currentStep < 3) {
  //     setCurrentStep((prev) => prev + 1);
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentStep > 0) {
  //     setCurrentStep((prev) => prev - 1);
  //   }
  // };

  const sendEmail = async () => {
    const formData = new FormData();
    formData.append("email", data.email);
    let response = await fetch("http://localhost:5000/user/sendVerificationCode", {
      method: "post",
      body: formData,
      credentials : 'include',
      mode : "cors"
    },{withCredentials: true });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const sendAllData = async (otp) => {
    const birthDate =
      data.yearOfBirth +
      "-" +
      (months.indexOf(data.monthOfBirth) + 1) +
      "-" +
      data.dayOfBirth;
    const formData = new FormData();
    formData.append("gender", data.gender);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("birthDate", birthDate);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("passportId", data.passportId);
    formData.append("verificationCode", otp);

    if (data.selectedImages.length > 0) {
      data.selectedImages.forEach((file) => {
        formData.append("images", file);
      });
    }

    let response = await fetch("http://localhost:5000/user/userAuthorization", {
      method: "POST",
      mode : 'cors',
      credentials : 'include',
      body: formData,
    },{withCredentials : true});
    if (response.ok) {
      setAlert(true);
    }
  };

  return (
    <div className={styles.Body}>
      <hr className={styles.HrLeft} />
      <hr className={styles.HrLeftSmall} />
      <hr className={styles.HrRight} />
      <hr className={styles.HrRightSmall} />

      <div className={styles.RoadMap}>
        {/*  */}
        <hr className={styles.FirstLine} />
        <label
          onClick={() => setCurrentStep(0)}
          htmlFor="Alert"
          className={styles.radio}
        >
          <input
            type="radio"
            name="RoadMap"
            id="Alert"
            className={`${styles.hidden} ${styles.AlertInput}`}
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
                  : currentStep == 3
                  ? " 2px solid #e43d3d"
                  : "2px solid #e43d3d",
            }}
          >
            <p>Alert</p>
          </span>
        </label>
        {/*  */}
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
                : currentStep == 3
                ? "#e43d3d"
                : "#ffffff",
          }}
        />
        <label
          onClick={() => {
            if (data.agreed) {
              setCurrentStep(1);
            }
          }}
          htmlFor="Information"
          className={styles.radio}
        >
          <input
            type="radio"
            name="RoadMap"
            id="Information"
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
                  : currentStep == 3
                  ? " 2px solid #e43d3d"
                  : "2px solid #e43d3d",
            }}
          >
            <p>Sign up</p>
          </span>
        </label>
        {/*  */}
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
                : currentStep == 3
                ? "#e43d3d"
                : "#ffffff",
          }}
        />

        <label
          onClick={() => {
            if (data.agreed && data.email.length > 0) {
              setCurrentStep(2);
            }
          }}
          htmlFor="none"
          className={styles.radio}
        >
          <input
            type="radio"
            name="RoadMap"
            id="none"
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
                  : currentStep == 3
                  ? " 2px solid #e43d3d"
                  : "2px solid #e43d3d",
            }}
          >
            <p>Information</p>
          </span>
        </label>
        {/*  */}
        <hr
          className={styles.Line3}
          style={{
            backgroundColor:
              currentStep == 0
                ? "#ffffff"
                : currentStep == 1
                ? "#ffffff"
                : currentStep == 2
                ? "#ffffff"
                : currentStep == 3
                ? "#e43d3d"
                : "#ffffff",
          }}
        />
        <label
          onClick={() => {
            if (
              data.agreed &&
              data.email.length > 0 &&
              data.selectedImages.length > 0
            ) {
              setCurrentStep(3);
            }
          }}
          htmlFor="Verification"
          className={styles.radio}
        >
          <input
            type="radio"
            name="RoadMap"
            id="Verification"
            className={`${styles.hidden} ${styles.VerificationInput}`}
            checked={currentStep == 3}
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
                  ? "  2px solid #ffffff"
                  : currentStep == 3
                  ? " 2px solid #e43d3d"
                  : "2px solid #e43d3d",
            }}
          >
            <p>Verification</p>
          </span>
        </label>
        {/*  */}
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
                : currentStep == 3
                ? "#e43d3d"
                : "#ffffff",
          }}
        />
      </div>

      {currentStep == 0 && (
        <StepOne
          clickHandler={() => {
            setData((prev) => ({ ...prev, agreed: true }));
            setCurrentStep(1);
          }}
        />
      )}

      {currentStep == 1 && (
        <StepTwo
          onSubmit={(info) => {
            setData((prev) => ({
              agreed: prev.agreed,
              gender: info.gender,
              firstName: info.firstName,
              lastName: info.lastName,
              country: info.country,
              city: info.city,
              yearOfBirth: info.yearOfBirth,
              monthOfBirth: info.monthOfBirth,
              dayOfBirth: info.dayOfBirth,
              email: info.email,
              phoneNumber: info.phoneNumber,
              passportId: info.passportId,
              selectedImages: prev.selectedImages,
            }));
            setCurrentStep(2);
          }}
          data={data}
        />
      )}
      {currentStep == 2 && (
        <StepThree
          onSubmit={(info) => {
            setData((prev) => ({ ...prev, selectedImages: info }));
            sendEmail();
            setCurrentStep(3);
          }}
          data={data.selectedImages}
        />
      )}
      {currentStep == 3 && (
        <StepFour onSubmit={sendAllData} email={data.email} alert={alert} />
      )}

      {/* <div className={styles.SuccessDiv}>
        <svg className={styles.progressCircle} width="73" height="73">
          <path
            d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
            stroke="#0aff0e"
            stroke-width="3"
            fill="transparent"
          />
        </svg>
        <img
          src="../public/img/tick-svgrepo-com (1).svg"
          className={styles.CompleteIcon}
        />
        <h2>Success !</h2>
        <p>
          Your work has been successfully completed and your information has
          been saved
        </p>
        <button className={styles.OkBtn} onClick="HideAccess()">
          OK
        </button>
      </div>

      <div className={styles.OverlaySuccess} onClick="HideAccess()"></div> */}
    </div>
  );
};

export default Verification;
