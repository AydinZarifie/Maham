import styles from "../styles/verification.module.css";

import attentionIcon from "../images/attention-svgrepo-com.svg";
import arrowDownIcon from "../images/arrow-down-svgrepo-com.svg";
import mahamLogo from "../images/Maham2.png";
import { useState } from "react";

const New = () => {
  const [data, setData] = useState({});

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.Body}>
      <hr className={styles.HrLeft} />
      <hr className={styles.HrLeftSmall} />
      <hr className={styles.HrRight} />
      <hr className={styles.HrRightSmall} />

      <div className={styles.SelectOverlay} onClick="toggleSelect()"></div>

      <div className={styles.SelectOverlay2} onClick="toggleSelect2()"></div>

      <div className={styles.RoadMap}>
        <hr className={styles.FirstLine} />
        <label onClick="lineColor1()" htmlFor="Alert" className={styles.radio}>
          <input
            type="radio"
            name="RoadMap"
            id="Alert"
            className={`${styles.hidden} ${styles.AlertInput}`}
            checked
          />

          <span className={`${styles.Circle} ${styles.Circle1}`}>
            <p>Alert</p>
          </span>
        </label>
        <hr className={styles.Line1} />
        <label
          onClick="lineColor2()"
          htmlFor="Information"
          className={styles.radio}
        >
          <input
            type="radio"
            name="RoadMap"
            id="Information"
            className={`${styles.hidden} ${styles.InfoInput}`}
          />
          <span className={`${styles.Circle} ${styles.Circle2}`}>
            <p>Sign up</p>
          </span>
        </label>
        <hr className={styles.Line2} />

        <label onClick="lineColor3()" htmlFor="none" className={styles.radio}>
          <input
            type="radio"
            name="RoadMap"
            id="none"
            className={`${styles.hidden} ${styles.none}`}
          />
          <span className={`${styles.Circle} ${styles.Circle3}`}>
            <p>none</p>
          </span>
        </label>
        <hr className={styles.Line3} />
        <label
          onClick="lineColor4()"
          htmlFor="Verification"
          className={styles.radio}
        >
          <input
            type="radio"
            name="RoadMap"
            id="Verification"
            className={`${styles.hidden} ${styles.VerificationInput}`}
          />
          <span className={`${styles.Circle} ${styles.Circle3}`}>
            <p>Verification</p>
          </span>
        </label>

        <hr className={styles.LastLine} />
      </div>
      <div className={styles.AlertDiv}>
        <div className={styles.AtenDiv}>
          <img src={attentionIcon} className={styles.AtenIcon} />
          <h2>pay attention</h2>
        </div>
        <p>
          Information such as name, surname, country, city and passport ID
          should be entered based on the passport, otherwise, the consequences
          of this work are with the user.
        </p>
        <button onClick="lineColor2()" className={styles.AgreeBtn}>
          agree
        </button>
      </div>
      <div className={styles.InformationDiv}>
        <div className={styles.selectHeader} onClick="toggleSelect()">
          <div className={styles.selectWrapper}>
            <span className={styles.arrow}>
              <img src={arrowDownIcon} className={styles.ArrowIcon} />
            </span>

            <select className={styles.mySelect}>
              <option>gender</option>
              <option>male</option>
              <option>female</option>
            </select>
          </div>
        </div>
        <div className={styles.InputDiv}>
          <div className={styles.inputContainer}>
            <input type="text" id="fname" value="" className={styles.inputs} />
            <label className={styles.label} htmlFor="fname">
              <div className={styles.text}>First Name</div>
            </label>
          </div>

          <div className={styles.inputContainer}>
            <input type="text" id="lname" value="" className={styles.inputs} />
            <label className={styles.label} htmlFor="lname">
              <div className={styles.text}>Last Name</div>
            </label>
          </div>
        </div>
        <div className={styles.InputDiv}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="CountryN"
              value=""
              className={styles.inputs}
            />
            <label className={styles.label} htmlFor="CountryN">
              <div className={styles.text}>Country</div>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" id="CityN" value="" className={styles.inputs} />
            <label className={styles.label} htmlFor="CityN">
              <div className={styles.text}>City</div>
            </label>
          </div>
        </div>
        <p className={styles.BirthP}>Date of birth:</p>
        <div className={styles.BirthInputDiv} style={{ marginBottom: "20px" }}>
          <div className={styles.selectHeader2} onClick="toggleSelect2()">
            <div className={styles.selectWrapper2}>
              <span className={styles.arrow2}>
                <img src={arrowDownIcon} className={styles.ArrowIcon2} />
              </span>

              <select className={styles.mySelect2}>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
          </div>

          <div className={styles.inputContainer3}>
            <input
              type="number"
              id="Day"
              value=""
              className={`${styles.inputs} ${styles.day}`}
              min="0"
              max="9999"
            />
            <label className={styles.label} htmlFor="Day">
              <div className={styles.text}>Day</div>
            </label>
          </div>
          <div className={styles.inputContainer3}>
            <input
              type="number"
              id="Year"
              value=""
              className={`${styles.inputs} ${styles.year}`}
              min="0"
              max="9999"
            />
            <label className={styles.label} htmlFor="Year">
              <div className={styles.text}>Year</div>
            </label>
          </div>
        </div>
        <div className={styles.InputDiv}>
          <div className={styles.inputContainer2}>
            <input type="text" id="Email" value="" className={styles.inputs} />
            <label className={styles.label} htmlFor="Email">
              <div className={styles.text}>Email</div>
            </label>
          </div>
        </div>
        <div className={styles.InputDiv}>
          <div className={styles.inputContainer2}>
            <input
              type="text"
              id="PhoneNumber"
              value=""
              className={styles.inputs}
            />
            <label className={styles.label} htmlFor="PhoneNumber">
              <div className={styles.text}>Phone number</div>
            </label>
          </div>
        </div>
        <div className={styles.InputDiv}>
          <div className={styles.inputContainer2}>
            <input
              type="text"
              id="Passport"
              value=""
              className={styles.inputs}
            />
            <label className={styles.label} htmlFor="Passport">
              <div className={styles.text}>Passport ID</div>
            </label>
          </div>
        </div>
        <button className={styles.SendCBtn} onClick="lineColor3()">
          send code
        </button>
      </div>

      <div className={styles.VerificationDiv}>
        <img src={mahamLogo} className={styles.Logo} />
        <h3>Enter verification code</h3>
        <span>
          <p className={styles.VeriP1}>We've sent a code to</p>
          <p className={styles.VeriP2}>rasoulihadi101@gmail.com</p>
        </span>

        <div className={styles.Container}>
          <div className={styles.inputfield}>
            <input
              type="number"
              maxlength="1"
              className={styles.input}
              disabled
            />
            <input
              type="number"
              maxlength="1"
              className={styles.input}
              disabled
            />
            <input
              type="number"
              maxlength="1"
              className={styles.input}
              disabled
            />
            <input
              type="number"
              maxlength="1"
              className={styles.input}
              disabled
            />
            <input
              type="number"
              maxlength="1"
              className={styles.input}
              disabled
            />
            <input
              type="number"
              maxlength="1"
              className={styles.input}
              disabled
            />
          </div>
        </div>

        <a href="#"> Didn't get code ? Click to resend </a>
        <button className={styles.VerifyBtn} onClick="ShowAccess()">
          verify
        </button>
      </div>
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

export default New;
