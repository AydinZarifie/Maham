import styles from "../../styles/verification.module.css";

import { useState } from "react";

import warningIcon from "../../images/warning-attention-red-svgrepo-com.svg";
import Select from "../general/Select";

const StepTwo = (props) => {
  const [data, setData] = useState({
    gender: props.data.gender,
    firstName: props.data.firstName,
    lastName: props.data.lastName,
    country: props.data.country,
    city: props.data.city,
    yearOfBirth: props.data.yearOfBirth,
    monthOfBirth: props.data.monthOfBirth,
    dayOfBirth: props.data.dayOfBirth,
    email: props.data.email,
    phoneNumber: props.data.phoneNumber,
    passportId: props.data.passportId,
  });

  const [touched, setTouched] = useState({
    gender: false,
    firstName: false,
    lastName: false,
    country: false,
    city: false,
    yearOfBirth: false,
    monthOfBirth: false,
    dayOfBirth: false,
    email: false,
    phoneNumber: false,
    passportId: false,
  });

  const enteredGenderIsValid = data.gender.trim() != "Gender";
  const enteredFirstNameIsValid = data.firstName.trim().length != 0;
  const enteredLastNameIsValid = data.lastName.trim().length != 0;
  const enteredCountryIsValid = data.country.trim().length != 0;
  const enteredCityIsValid = data.city.trim().length != 0;
  const enteredYearOfBirthIsValid = data.yearOfBirth.trim().length == 4;
  const enteredMonthOfBirthIsValid = data.monthOfBirth.trim() != "Month";
  const enteredDayOfBirthIsValid =
    data.dayOfBirth.trim().length == 1 || data.dayOfBirth.trim().length == 2;
  const enteredEmailIsValid = data.email.trim().length != 0;
  const enteredPhoneNumberIsValid = data.phoneNumber.trim().length != 0;
  const enteredPassportIdIsValid = data.passportId.trim().length != 0;

  const genderIsInvalid = !enteredGenderIsValid && touched.gender;
  const firstNameIsInvalid = !enteredFirstNameIsValid && touched.gender;
  const lastNameIsInvalid = !enteredLastNameIsValid && touched.gender;
  const countryIsInvalid = !enteredCountryIsValid && touched.gender;
  const cityIsInvalid = !enteredCityIsValid && touched.gender;
  const yearOfBirthIsInvalid = !enteredYearOfBirthIsValid && touched.gender;
  const monthOfBirthIsInvalid = !enteredMonthOfBirthIsValid && touched.gender;
  const dayOfBirthIsInvalid = !enteredDayOfBirthIsValid && touched.gender;
  const emailIsInvalid = !enteredEmailIsValid && touched.gender;
  const phoneNumberIsInvalid = !enteredPhoneNumberIsValid && touched.gender;
  const passportIdIsInvalid = !enteredPassportIdIsValid && touched.gender;

  let formIsvalid = false;

  if (
    enteredGenderIsValid &&
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredCountryIsValid &&
    enteredCityIsValid &&
    enteredYearOfBirthIsValid &&
    enteredMonthOfBirthIsValid &&
    enteredDayOfBirthIsValid &&
    enteredEmailIsValid &&
    enteredPhoneNumberIsValid &&
    enteredPassportIdIsValid
  ) {
    formIsvalid = true;
  }

  const firstNameClass = firstNameIsInvalid
    ? `${styles.invalid}  `
    : `${styles.inputs} `;
  const lastNameClass = lastNameIsInvalid
    ? `${styles.invalid}  `
    : `${styles.inputs} `;
  const countryClass = countryIsInvalid
    ? `${styles.invalid}  `
    : `${styles.inputs} `;
  const cityClass = cityIsInvalid ? `${styles.invalid}  ` : `${styles.inputs} `;
  const dayOfBirthClass = dayOfBirthIsInvalid
    ? `${styles.invalid}  `
    : `${styles.inputs} `;
  const yearOfBirthClass = yearOfBirthIsInvalid
    ? `${styles.invalid}  `
    : `${styles.inputs} `;
  const emailClass = emailIsInvalid
    ? `${styles.invalid}  `
    : `${styles.inputs} `;
  const phoneNumberClass = phoneNumberIsInvalid
    ? `${styles.invalid}  `
    : `${styles.inputs} `;
  const passportIdClass = passportIdIsInvalid
    ? `${styles.invalid} `
    : `${styles.inputs} `;

  const eventHandler = (event) => {
    const { name, value } = event.target;

    if (name == "dayOfBirth") {
      if (value.length >= 2) {
        const newValue = value.slice(0, 2);
        setData((prev) => ({ ...prev, [name]: newValue }));
      } else {
        setData((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name == "yearOfBirth") {
      if (value.length >= 4) {
        const newValue = value.slice(0, 4);
        setData((prev) => ({ ...prev, [name]: newValue }));
      } else {
        setData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitHandler = () => {
    setTouched({
      gender: true,
      firstName: true,
      lastName: true,
      country: true,
      city: true,
      yearOfBirth: true,
      monthOfBirth: true,
      dayOfBirth: true,
      email: true,
      phoneNumber: true,
      passportId: true,
    });
    if (!formIsvalid) {
      return;
    }

    props.onSubmit(data);
  };

  return (
    //open open2 mySelect2 invalidForSelect2 mySelect invalidForSelect
    <div className={styles.InformationDiv}>
      {/* {toggleOne && (
        <div className={styles.SelectOverlay} onClick={toggleOneToggle}></div>
      )} */}
      {/* {toggleTwo && (
        <div className={styles.SelectOverlay2} onClick={toggleTwoToggle}></div>
      )} */}
      <div className={styles.selectHeader}>
        {/*  */}
        {/* <div className={styles.ErrorDiv}>
          <img
            src={warningIcon}
            className={styles.ErrorIcon}
          />
          <p>Email or phone number already exist</p>
        </div> */}
        {/*  */}
        {/* <div className={styles.selectWrapper}> */}
        {/* <span className={styles.arrow}>
            <img src={arrowDownIcon} className={styles.ArrowIcon} />
          </span> */}

        {/* <select
            className={genderClass}
            onChange={eventHandler}
            name="gender"
            value={data.gender}
          >
            <option value="">gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select> */}
        <Select
          items={["Male", "Female"]}
          invalid={genderIsInvalid}
          set={(option) => setData((prev) => ({ ...prev, gender: option }))}
          selected={data.gender}
          style={
            genderIsInvalid
              ? {
                  background: "rgba(239, 239, 239, 0)",
                  height: "38px",
                  border: "1px solid #ff2c2c",
                  borderRadius: "4px",
                  color: "#626262",
                  zIndex: "100",
                  position: "relative",
                  fontSize: "13px",
                }
              : {
                  background: "rgba(239, 239, 239, 0)",
                  height: "38px",
                  border: "1px solid #c0c0c0",
                  borderRadius: "4px",
                  color: "#626262",
                  zIndex: "100",
                  position: "relative",
                  fontSize: "13px",
                }
          }
        />
        {/* </div> */}
      </div>
      <div className={styles.InputDiv}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="fname"
            name="firstName"
            value={data.firstName}
            onChange={eventHandler}
            className={firstNameClass}
            // style={firstNameIsInvalid ? {border:"1px solid #ff2c2c"}:{}}
          />
          <label className={styles.label} htmlFor="fname">
            <div
              className={styles.text}
              //  style={firstNameIsInvalid ? {color:"red"}:{}}
            >
              First Name
            </div>
          </label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            id="lname"
            name="lastName"
            value={data.lastName}
            onChange={eventHandler}
            className={lastNameClass}
          />
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
            name="country"
            value={data.country}
            onChange={eventHandler}
            className={countryClass}
          />
          <label className={styles.label} htmlFor="CountryN">
            <div className={styles.text}>Country</div>
          </label>
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="CityN"
            name="city"
            value={data.city}
            onChange={eventHandler}
            className={cityClass}
          />
          <label className={styles.label} htmlFor="CityN">
            <div className={styles.text}>City</div>
          </label>
        </div>
      </div>
      <p className={styles.BirthP}>Date of birth:</p>
      <div className={styles.BirthInputDiv} style={{ marginBottom: "20px" }}>
        <div className={styles.selectHeader2}>
          {/* <div className={styles.selectWrapper2}> */}
         
          <Select
            invalid={monthOfBirthIsInvalid}
            items={[
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
            ]}
            set={(option) =>
              setData((prev) => ({ ...prev, monthOfBirth: option }))
            }
            selected={data.monthOfBirth}
            style={
              monthOfBirthIsInvalid
                ? {
                    background: "rgba(239, 239, 239, 0)",
                    height: "38px",
                    border: "1px solid #ff2c2c",
                    borderRadius: "4px",
                    color: "#626262",
                    zIndex: "100",
                    position: "relative",
                    fontSize: "13px",
                  }
                : {
                    background: "rgba(239, 239, 239, 0)",
                    height: "38px",
                    border: "1px solid #c0c0c0",
                    borderRadius: "4px",
                    color: "#626262",
                    zIndex: "100",
                    position: "relative",
                    fontSize: "13px",
                  }
            }
          />
          {/* <span className={styles.arrow2}>
              <img src={arrowDownIcon} className={styles.ArrowIcon2} />
            </span>

            <select
              className={monthOfBirthClass}
              name="monthOfBirth"
              onChange={eventHandler}
              value={data.monthOfBirth}
            >
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select> */}
          {/* </div> */}
        </div>

        <div className={styles.inputContainer3}>
          <input
            type="number"
            id="Day"
            name="dayOfBirth"
            value={data.dayOfBirth}
            onChange={eventHandler}
            className={dayOfBirthClass}
            min="0"
            max="31"
          />
          <label className={styles.label} htmlFor="Day">
            <div className={styles.text}>Day</div>
          </label>
        </div>
        <div className={styles.inputContainer3}>
          <input
            type="number"
            id="Year"
            name="yearOfBirth"
            value={data.yearOfBirth}
            onChange={eventHandler}
            className={yearOfBirthClass}
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
          <input
            type="email"
            id="Email"
            name="email"
            value={data.email}
            onChange={eventHandler}
            className={emailClass}
          />
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
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={eventHandler}
            className={phoneNumberClass}
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
            name="passportId"
            value={data.passportId}
            onChange={eventHandler}
            className={passportIdClass}
          />
          <label className={styles.label} htmlFor="Passport">
            <div className={styles.text}>Passport ID</div>
          </label>
        </div>
      </div>
      <button className={styles.SendCBtn} onClick={submitHandler}>
        Next
      </button>
    </div>
  );
};

export default StepTwo;
