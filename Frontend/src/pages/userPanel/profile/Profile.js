import { forwardRef, useRef, useState } from "react";
import styles from "../../../styles/userPanelProfile.module.css";

import profileIcon from "../../../images/white-profile-circle-svgrepo-com.svg";
import profileWithPenIcon from "../../../images/user-pen-svgrepo-com.svg";
import securityIcon from "../../../images/security-safe-svgrepo-com.svg";
import helpIcon from "../../../images/help-question-svgrepo-com.svg";
import arrowDownIcon from "../../../images/arrow-down-svgrepo-com.svg";
import backArrowIcon from "../../../images/arrow-sm-left-svgrepo-com.svg";
import editIcon from "../../../images/black-edit-svgrepo-com.svg";

const Profile = forwardRef((props, ref) => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    country: "",
    city: "",
    phoneNumber: "",
  });

  const [editable, setEditable] = useState({
    userName: false,
    email: false,
    country: false,
    city: false,
    phoneNumber: false,
  });

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [userInformation, setUserInformation] = useState(false);
  const userInformationRef = useRef();
  function OpenProfileItem1() {
    if (userInformation) {
      userInformationRef.current.style.maxHeight = "0px";
      userInformationRef.current.style.minHeight = "0px";

      setUserInformation(false);
    } else {
      userInformationRef.current.style.maxHeight = "49px";
      userInformationRef.current.style.minHeight = "49px";

      setUserInformation(true);
    }
  }

  const [security, setSecurity] = useState(false);
  const securityRef = useRef();
  function OpenProfileItem2() {
    if (security) {
      securityRef.current.style.maxHeight = "0px";
      securityRef.current.style.minHeight = "0px";

      setSecurity(false);
    } else {
      securityRef.current.style.maxHeight = "49px";
      securityRef.current.style.minHeight = "49px";

      setSecurity(true);
    }
  }

  const [help, setHelp] = useState(false);
  const helpRef = useRef();
  function OpenProfileItem3() {
    if (help) {
      helpRef.current.style.maxHeight = "0px";
      helpRef.current.style.minHeight = "0px";

      setHelp(false);
    } else {
      helpRef.current.style.maxHeight = "96px";
      helpRef.current.style.minHeight = "96px";

      setHelp(true);
    }
  }

  const passwordRef = useRef();

  function openPassword() {
    passwordRef.current.style.width = "300px";
  }
  function closePassword() {
    passwordRef.current.style.width = "0px";
  }

  const profileRef = useRef();

  function openProfile() {
    profileRef.current.style.width = "300px";

    setEditable({
      userName: false,
      email: false,
      country: false,
      city: false,
      phoneNumber: false,
    });
  }
  function closeProfile() {
    profileRef.current.style.width = "0px";
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dataEventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordEventHandler = (event) => {
    const { name, value } = event.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className={styles.Profile} ref={ref}>
        <div className={styles.CloseProfile} onClick={props.closeHandler}>
          &times;
        </div>
        <div className={styles.ProfileHeader}>
          <img src={profileIcon} className={styles.ProfileIcon} />
          <h4>Moein aghasi javid</h4>
        </div>
        <div className={styles.ProfileItem} onClick={OpenProfileItem1}>
          {userInformation && <div className={styles.LeftLine}></div>}

          <div className={styles.ProfileItemInside}>
            <img src={profileWithPenIcon} className={styles.ProfileItemIcon} />
            User Information
          </div>
          <img
            src={arrowDownIcon}
            className={styles.ProfileArrowIcon}
            style={userInformation ? { rotate: "180deg" } : {}}
          />
        </div>
        <div className={styles.ProfileItems} ref={userInformationRef}>
          <h5 onClick={openProfile}>- Profile</h5>
        </div>

        <div className={styles.ProfileItem} onClick={OpenProfileItem2}>
          {security && <div className={styles.LeftLine2}></div>}
          <div className={styles.ProfileItemInside}>
            <img src={securityIcon} className={styles.ProfileItemIcon} />
            Security
          </div>
          <img
            src={arrowDownIcon}
            className={styles.ProfileArrowIcon2}
            style={security ? { rotate: "180deg" } : {}}
          />
        </div>
        <div className={styles.ProfileItems2} ref={securityRef}>
          <h5 onClick={openPassword}>- Change password</h5>
        </div>

        <div className={styles.ProfileItem} onClick={OpenProfileItem3}>
          {help && <div className={styles.LeftLine3}></div>}
          <div className={styles.ProfileItemInside}>
            <img src={helpIcon} className={styles.ProfileItemIcon} />
            Help
          </div>
          <img
            src={arrowDownIcon}
            className={styles.ProfileArrowIcon3}
            style={help ? { rotate: "180deg" } : {}}
          />
        </div>
        <div className={styles.ProfileItems3} ref={helpRef}>
          <h5>- Guide</h5>
          <h5>- Maham whitepaper</h5>
        </div>
        {/*  */}
        <div className={styles.ProfileItemDiv} ref={profileRef}>
          <div className={styles.ProfileItemsHeader}>
            <img
              className={styles.ArrowLeftIcon}
              src={backArrowIcon}
              onClick={closeProfile}
            />
            <p>Profile</p>
          </div>

          <div className={styles.EditDiv}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="userName"
                name="userName"
                value={data.userName}
                onChange={dataEventHandler}
                className={`${styles.inputs} ${styles.UserNameInput}`}
                disabled={!editable.userName}
              />
              <label className={styles.label} htmlFor="userName">
                <div className={styles.text}>User name</div>
              </label>
            </div>
            <button
              className={styles.ProfileEditBtn}
              onClick={() =>
                setEditable((prev) => ({ ...prev, userName: !prev.userName }))
              }
            >
              <img src={editIcon} className={styles.ProfileEditIcon} />
            </button>
          </div>
          <div className={styles.EditDiv}>
            <div className={styles.inputContainer}>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={dataEventHandler}
                className={`${styles.inputs} ${styles.EmailInput}`}
                disabled={!editable.email}
              />
              <label className={styles.label} htmlFor="email">
                <div className={styles.text}>Email</div>
              </label>
            </div>
            <button
              className={styles.ProfileEditBtn}
              onClick={() =>
                setEditable((prev) => ({ ...prev, email: !prev.email }))
              }
            >
              <img src={editIcon} className={styles.ProfileEditIcon} />
            </button>
          </div>
          <div className={styles.EditDiv}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="country"
                name="country"
                value={data.country}
                onChange={dataEventHandler}
                className={`${styles.inputs} ${styles.CountryInput}`}
                disabled={!editable.country}
              />
              <label className={styles.label} htmlFor="country">
                <div className={styles.text}>Country</div>
              </label>
            </div>
            <button
              className={styles.ProfileEditBtn}
              onClick={() =>
                setEditable((prev) => ({ ...prev, country: !prev.country }))
              }
            >
              <img src={editIcon} className={styles.ProfileEditIcon} />
            </button>
          </div>
          <div className={styles.EditDiv}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="city"
                name="city"
                value={data.city}
                onChange={dataEventHandler}
                className={`${styles.inputs} ${styles.CityInput}`}
                disabled={!editable.city}
              />
              <label className={styles.label} htmlFor="city">
                <div className={styles.text}>City</div>
              </label>
            </div>
            <button
              className={styles.ProfileEditBtn}
              onClick={() =>
                setEditable((prev) => ({ ...prev, city: !prev.city }))
              }
            >
              <img src={editIcon} className={styles.ProfileEditIcon} />
            </button>
          </div>

          <div className={styles.EditDiv}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={dataEventHandler}
                className={`${styles.inputs} ${styles.PhoneInput}`}
                disabled={!editable.phoneNumber}
              />
              <label className={styles.label} htmlFor="phoneNumber">
                <div className={styles.text}>Phone number</div>
              </label>
            </div>
            <button
              className={styles.ProfileEditBtn}
              onClick={() =>
                setEditable((prev) => ({
                  ...prev,
                  phoneNumber: !prev.phoneNumber,
                }))
              }
            >
              <img src={editIcon} className={styles.ProfileEditIcon} />
            </button>
          </div>

          <button
            className={styles.SubmitBtn}
            // onClick="SubmitProfile()"
          >
            Submit
          </button>
        </div>

        <div className={styles.ProfileItemDiv2} ref={passwordRef}>
          <div className={styles.ProfileItemsHeader2}>
            <img
              className={styles.ArrowLeftIcon}
              src={backArrowIcon}
              onClick={closePassword}
            />
            <p>Change password</p>
          </div>
          <div className={styles.inputContainer2}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password.password}
              onChange={passwordEventHandler}
              className={styles.PasswordInputs}
            />
            <label className={styles.PasswordLabel} htmlFor="password">
              <div className={styles.PasswordText}>Password</div>
            </label>
          </div>
          <div className={styles.inputContainer2}>
            <input
              // type="password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={passwordEventHandler}
              className={styles.PasswordInputs}
            />
            <label className={styles.PasswordLabel} htmlFor="confirmPassword">
              <div className={styles.PasswordText}>Confirm password</div>
            </label>
          </div>
          <button
            className={styles.SubmitBtn}
            // onClick={}
          >
            Submit
          </button>
        </div>

        {/*  */}
      </div>
    </>
  );
});

export default Profile;
