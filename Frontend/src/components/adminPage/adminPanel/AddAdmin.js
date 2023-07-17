import styles from "../../../styles/AdminPanel.module.css";

import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const AddAdmin = () => {
  const { error, submitAddAdminHandler, countries, cityFetch } =
    useOutletContext();
  const [data, setData] = useState({
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    type: false,
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    country: false,
    city: false,
    password: false,
    confirmPassword: false,
  });

  const enteredTypeIsValid = data.type.trim() !== "";
  const enteredFirstNameIsValid = data.firstName.trim() !== "";
  const enteredLastNameIsValid = data.lastName.trim() !== "";
  const enteredEmailIsValid = data.email.trim() !== "";
  const enteredPhoneNumberIsValid = data.phoneNumber.trim() !== "";
  const enteredCountryIsValid = data.country.trim() !== "";
  const enteredCityIsValid = data.city.trim() !== "";
  const enteredPasswordIsValid = data.password.trim() !== "";
  const enteredConfirmPasswordIsValid = data.confirmPassword.trim() !== "";

  const typeIsInvalid = !enteredTypeIsValid && touched.type;
  const firstNameIsInvalid = !enteredFirstNameIsValid && touched.firstName;
  const lastNameIsInvalid = !enteredLastNameIsValid && touched.lastName;
  const emailIsInvalid = !enteredEmailIsValid && touched.email;
  const phoneNumberIsInvalid =
    !enteredPhoneNumberIsValid && touched.phoneNumber;
  const countryIsInvalid = !enteredCountryIsValid && touched.country;
  const cityIsInvalid = !enteredCityIsValid && touched.city;
  const passwordIsInvalid = !enteredPasswordIsValid && touched.password;
  const confirmPasswordIsInvalid =
    !enteredPasswordIsValid && touched.confirmPassword;

  let formIsValid = false;

  if (
    enteredTypeIsValid &&
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneNumberIsValid &&
    //enteredCountryIsValid &&
   // enteredCityIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const blurHandler = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (name == "country") {
      cityFetch(value);
    }
  };

  const submit = (event) => {
    event.preventDefault()
    setTouched({
      type: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      country: true,
      city: true,
      password: true,
      confirmPassword: true,
    });
    if (!formIsValid) {
      return;
    }
    if (data.password !== data.confirmPassword) {
      return;
    }
    submitAddAdminHandler(
      data.type,
      data.firstName,
      data.lastName,
      data.email,
      data.phoneNumber,
      data.country,
      data.city,
      data.password,
      data.confirmPassword
    );
  };

  const typeClass = typeIsInvalid
    ? `${styles.invalid} ${styles.SelectType} `
    : `${styles.SelectType} `;
  const firstNameClass = firstNameIsInvalid
    ? `${styles.invalid} ${styles.InputAdmin} `
    : `${styles.InputAdmin} `;
  const LastNameClass = lastNameIsInvalid
    ? `${styles.invalid} ${styles.InputAdmin} `
    : `${styles.InputAdmin} `;
  const emailClass = emailIsInvalid
    ? `${styles.invalid} ${styles.InputAdmin} `
    : `${styles.InputAdmin} `;
  const phoneNumberClass = phoneNumberIsInvalid
    ? `${styles.invalid} ${styles.InputAdmin} `
    : `${styles.InputAdmin} `;
  const countryClass = countryIsInvalid
    ? `${styles.invalid} ${styles.SelectType} `
    : `${styles.SelectType} `;
  const cityClass = cityIsInvalid
    ? `${styles.invalid} ${styles.SelectType} `
    : `${styles.SelectType} `;
  const passwordClass = passwordIsInvalid
    ? `${styles.invalid} ${styles.InputAdmin} `
    : `${styles.InputAdmin} `;
  const confirmPasswordClass = confirmPasswordIsInvalid
    ? `${styles.invalid} ${styles.InputAdmin} `
    : `${styles.InputAdmin} `;

  return (
    <form>
      <div className={styles.mainDiv}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.SelectDiv}>
          <select
            name="type"
            className={typeClass}
            onChange={eventHandler}
            value={data.type}
            onBlur={blurHandler}
          >
            <option className={styles.SelectOption} value="">
              Type
            </option>
            <option className={styles.SelectOption} value="superAdmin">
              Super Admin
            </option>
            <option className={styles.SelectOption} value="admin">
              Admin
            </option>
          </select>
        </div>
        <div className={styles.FLnameDiv}>
          <div className={styles.floatingLabel}>
            <input
              className={firstNameClass}
              placeholder="First name"
              type="text"
              name="firstName"
              id="firstName"
              required
              onChange={eventHandler}
              value={data.firstName}
              onBlur={blurHandler}
            />
            <label className={styles.InputLabel} htmlFor="firstName">
              First name
            </label>
            <div className={styles.icon}>
              <svg viewBox="0 0 32 32">
                <g id="SVGRepo_iconCarrier">
                  <path d="M16 16.75c4.28 0 7.75-3.47 7.75-7.75s-3.47-7.75-7.75-7.75c-4.28 0-7.75 3.47-7.75 7.75v0c0.005 4.278 3.472 7.745 7.75 7.75h0zM16 2.75c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25c-3.452 0-6.25-2.798-6.25-6.25v0c0.004-3.45 2.8-6.246 6.25-6.25h0zM30.41 29.84c-1.503-6.677-7.383-11.59-14.41-11.59s-12.907 4.913-14.391 11.491l-0.019 0.099c-0.011 0.048-0.017 0.103-0.017 0.16 0 0.414 0.336 0.75 0.75 0.75 0.357 0 0.656-0.25 0.731-0.585l0.001-0.005c1.351-5.998 6.633-10.41 12.945-10.41s11.594 4.413 12.929 10.322l0.017 0.089c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005z" />
                </g>
              </svg>
            </div>
          </div>
          <div className={styles.floatingLabel}>
            <input
              className={LastNameClass}
              placeholder="Last name"
              type="text"
              name="lastName"
              id="lastName"
              required
              onChange={eventHandler}
              value={data.lastName}
              onBlur={blurHandler}
            />
            <label className={styles.InputLabel} htmlFor="lastName">
              Last name
            </label>
            <div className={styles.icon}>
              {/* <img src={profileLogo} /> */}
              <svg viewBox="0 0 32 32">
                <g id="SVGRepo_iconCarrier">
                  <path d="M16 16.75c4.28 0 7.75-3.47 7.75-7.75s-3.47-7.75-7.75-7.75c-4.28 0-7.75 3.47-7.75 7.75v0c0.005 4.278 3.472 7.745 7.75 7.75h0zM16 2.75c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25c-3.452 0-6.25-2.798-6.25-6.25v0c0.004-3.45 2.8-6.246 6.25-6.25h0zM30.41 29.84c-1.503-6.677-7.383-11.59-14.41-11.59s-12.907 4.913-14.391 11.491l-0.019 0.099c-0.011 0.048-0.017 0.103-0.017 0.16 0 0.414 0.336 0.75 0.75 0.75 0.357 0 0.656-0.25 0.731-0.585l0.001-0.005c1.351-5.998 6.633-10.41 12.945-10.41s11.594 4.413 12.929 10.322l0.017 0.089c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005z" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.emailDiv}>
          <div className={styles.floatingLabel2}>
            <input
              className={emailClass}
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              required
              onChange={eventHandler}
              value={data.email}
              onBlur={blurHandler}
            />
            <label className={styles.InputLabel} htmlFor="email">
              Email
            </label>
            <div className={styles.icon}>
              {/* <img src={emailLogo} /> */}
              <svg
                height="64px"
                width="64px"
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path
                      className={{ fill: "#000000" }}
                      d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009 c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067 c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745 c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51 c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05 c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104 c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929 c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443 c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925 l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244 c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16 c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572 c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.PhoneNumberDiv}>
          <div className={styles.floatingLabel2}>
            <input
              className={phoneNumberClass}
              placeholder="Phone number"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              required
              onChange={eventHandler}
              value={data.phoneNumber}
              onBlur={blurHandler}
            />
            <label className={styles.InputLabel} htmlFor="phoneNumber">
              Phone number
            </label>
            <div className={styles.icon}>
              {/* <img src={phoneLogo} /> */}
              <svg
                fill="#000000"
                width="64px"
                height="64px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <path d="M8.194 1.156c1.169 1.612 2.563 3.694 4.175 6.237 0.406 0.688 0.344 1.512-0.181 2.481-0.2 0.406-0.706 1.331-1.512 2.787 0.887 1.25 2.238 2.787 4.056 4.6s3.331 3.169 4.538 4.056c1.45-0.85 2.381-1.369 2.788-1.575 0.525-0.281 1.031-0.425 1.512-0.425 0.363 0 0.688 0.081 0.969 0.244 1.856 1.131 3.956 2.525 6.294 4.175 0.444 0.325 0.694 0.769 0.756 1.331 0.063 0.569-0.113 1.169-0.512 1.819-0.2 0.281-0.525 0.694-0.969 1.244-0.444 0.544-1.113 1.231-2 2.056s-1.613 1.244-2.181 1.244h-0.063c-4.269-0.169-9.531-3.369-15.762-9.6-6.237-6.238-9.438-11.494-9.6-15.769 0-0.563 0.412-1.3 1.244-2.212 0.825-0.906 1.506-1.563 2.025-1.969 0.525-0.4 0.969-0.725 1.331-0.969 0.444-0.325 0.95-0.481 1.513-0.481 0.694 0 1.212 0.244 1.581 0.725zM6.194 2.425c-0.85 0.606-1.644 1.287-2.394 2.031-0.744 0.75-1.181 1.3-1.3 1.662 0.163 3.756 3.156 8.537 8.988 14.35s10.625 8.819 14.375 9.019c0.325-0.119 0.856-0.563 1.606-1.331s1.425-1.575 2.025-2.419c0.119-0.163 0.163-0.3 0.119-0.425-2.419-1.694-4.438-3.044-6.056-4.056-0.163 0-0.363 0.063-0.606 0.181-0.363 0.2-1.269 0.706-2.725 1.512l-1.031 0.606-1.031-0.669c-1.331-0.925-2.944-2.363-4.844-4.3-1.894-1.894-3.306-3.512-4.238-4.844l-0.725-0.969 0.606-1.088c0.806-1.45 1.313-2.363 1.512-2.725 0.119-0.244 0.181-0.444 0.181-0.606-1.438-2.294-2.769-4.313-3.981-6.050h-0.063c-0.156 0-0.3 0.044-0.419 0.119z" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.CountryAndCityDiv}>
          <div className={styles.SelectDiv} style={{ marginTop: 0 }}>
            <select
              name="country"
              className={countryClass}
              onChange={eventHandler}
              value={data.country}
              onBlur={blurHandler}
              style={{ width: "100%" }}
            >
              <option className={styles.SelectOption} value="">
                Country
              </option>
              {countries.map((country) => (
                <option
                  key={country.country_name}
                  className={styles.SelectOption}
                  value={country.country_name}
                >
                  {country.country_name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.SelectDiv} style={{ marginTop: 0 }}>
            <select
              name="city"
              className={cityClass}
              onChange={eventHandler}
              value={data.city}
              onBlur={blurHandler}
              style={{ width: "100%" }}
            >
              <option className={styles.SelectOption} value="">
                City
              </option>
              {countries.map((country) => (
                <option
                  key={country.country_name}
                  className={styles.SelectOption}
                  value={country.country_name}
                >
                  {country.country_name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className={styles.floatingLabel}>
          <input
            className={countryClass}
            placeholder="Country"
            type="text"
            name="country"
            id="countryInput"
            required
            onChange={eventHandler}
            value={data.country}
            onBlur={blurHandler}
          />
          <label className={styles.InputLabel} htmlFor="countryInput">
            Country
          </label>
          <div className={styles.icon}>
            <svg
              height="64px"
              width="64px"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <g>
                  <path
                    className={{ fill: "#000000" }}
                    d="M454.111,193.473c-3.617,3.21-7.4,6.252-11.391,9.095c-9.236,6.546-14.26,10.143-17.404,12.866 c9.216,20.58,14.875,43.094,15.996,66.857h-66.418h-17.61h-92.449V170.384h-17.671h-70.307c2.769-6.606,5.732-12.886,8.915-18.731 c9.522-17.564,20.753-31.484,32.724-40.786c0.901-0.7,1.802-1.321,2.703-1.975c5.479-1.028,11.064-1.749,16.696-2.296 c-0.327-3.737-0.554-7.487-0.554-11.257c0-8.348,0.814-16.503,2.322-24.417c-54.439,3.977-103.533,27.693-139.848,64.022 c-39.939,39.919-64.702,95.252-64.689,156.184c-0.014,60.932,24.75,116.265,64.689,156.184 c39.912,39.939,95.245,64.703,156.184,64.689c60.939,0.014,116.266-24.75,156.184-64.689 c39.938-39.918,64.695-95.251,64.689-156.184C476.879,256.1,468.658,222.935,454.111,193.473z M124.813,159.941 c17.27-17.264,37.903-31.09,60.812-40.492c-10.918,14.133-20.213,31.404-27.76,50.936h-42.661 C118.287,166.794,121.463,163.284,124.813,159.941z M101.731,188.054h49.955c-8.708,28.134-13.86,60.165-14.634,94.238H70.688 C72.322,247.478,83.52,215.248,101.731,188.054z M94.504,382.422c-13.92-24.55-22.408-52.538-23.816-82.46h66.424 c0.674,29.435,4.624,57.275,11.317,82.46H94.504z M124.813,422.314c-6.886-6.887-13.2-14.334-18.938-22.221h47.833 c4.691,14.053,10.17,27.193,16.529,38.931c4.711,8.675,9.876,16.616,15.422,23.803 C162.737,453.424,142.097,439.584,124.813,422.314z M247.164,476.433c-8.835-0.414-17.496-1.475-25.958-3.07 c-0.908-0.654-1.808-1.274-2.71-1.968c-17.971-13.948-34.206-38.357-45.664-69.701c-0.186-0.52-0.353-1.081-0.547-1.602h74.879 V476.433z M247.164,382.422H166.68c-7-24.758-11.251-52.725-11.965-82.46h92.449V382.422z M247.164,282.292h-92.509 c0.814-34.54,6.453-66.744,15.568-94.238h76.94V282.292z M264.835,299.963h92.509c-0.701,29.729-4.985,57.702-11.985,82.46h-80.524 V299.963z M293.503,471.395c-0.894,0.694-1.802,1.314-2.71,1.968c-8.462,1.595-17.123,2.656-25.958,3.07v-76.34h74.898 c-3.964,11.044-8.488,21.28-13.506,30.509C316.705,448.165,305.474,462.079,293.503,471.395z M387.193,422.314 c-17.283,17.264-37.91,31.097-60.825,40.506c11.691-15.135,21.574-33.792,29.388-55.04c0.921-2.496,1.749-5.112,2.603-7.688h47.766 C400.385,407.98,394.073,415.427,387.193,422.314z M417.495,382.422H363.69c6.673-25.165,10.584-53.051,11.257-82.46h66.365 C439.904,329.885,431.409,357.872,417.495,382.422z"
                  />
                  <path
                    className={{ fill: "#000000" }}
                    d="M313.762,173.741c22.468,15.949,27.434,19.746,35.341,34.833c6.253,11.945,16.39,32.885,16.39,32.885 c0.48,0.954,1.448,1.562,2.522,1.562c1.061,0,2.049-0.608,2.522-1.562c0,0,10.143-20.94,16.396-32.885 c7.894-15.088,12.866-18.884,35.341-34.833c24.63-17.47,41.086-45.911,41.086-78.402C463.359,42.688,420.665,0,368.014,0 c-52.658,0-95.332,42.688-95.332,95.339C272.682,127.83,289.125,156.27,313.762,173.741z M368.014,55.013 c22.275,0,40.332,18.058,40.332,40.326c0,22.274-18.057,40.332-40.332,40.332c-22.275,0-40.326-18.058-40.326-40.332 C327.689,73.071,345.739,55.013,368.014,55.013z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className={styles.floatingLabel}>
          <input
            className={cityClass}
            placeholder="City"
            type="text"
            name="city"
            id="cityInput"
            required
            onChange={eventHandler}
            value={data.city}
            onBlur={blurHandler}
          />
          <label className={styles.InputLabel} htmlFor="cityInput">
            City
          </label>
          <div className={styles.icon}>
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              stroke="#000000"
              strokeWidth="1.248"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <defs></defs>

                <path
                 
                  d="M27.5944,5.5948a9.0331,9.0331,0,0,0-9.0331,9.0331c0,7.0693,6.8966,15.5761,8.7032,17.6655a.5577.5577,0,0,0,.7855.055l.0549-.055c1.7831-2.0973,8.5226-10.5962,8.5226-17.6655A9.0331,9.0331,0,0,0,27.5944,5.5948Zm0,12.8548a4.4344,4.4344,0,1,1,4.4344-4.4344v.0113A4.4344,4.4344,0,0,1,27.5944,18.45Z"
                />

                <polyline
               
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  }}
                  points="36.454 16.678 37.629 16.598 42.5 40.607 32.376 42.405 16.461 40.723 5.5 42.405 8.458 17.758 17.447 16.598 18.736 16.662"
                />

                <line
                 
                  x1="17.4467"
                  y1="16.598"
                  x2="16.8049"
                  y2="40.7598"
                />

                <line
                 
                  x1="32.3758"
                  y1="42.4052"
                  x2="30.6655"
                  y2="28.982"
                />
              </g>
            </svg>
          </div> 
        </div>*/}
        </div>
        <div className={styles.PasswordDiv}>
          <div className={styles.floatingLabel2}>
            <input
              className={passwordClass}
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              required
              onChange={eventHandler}
              value={data.password}
              onBlur={blurHandler}
              autoComplete="new-password"
            />
            <label className={styles.InputLabel} htmlFor="password">
              Password
            </label>
            <div className={styles.icon}>
              {/* <img src={lockLogo} /> */}
              <svg viewBox="0 0 24 24">
                <path
                  // className="st1"
                  d="M19,21H5V9h14V21z M6,20h12V10H6V20z"
                />
                <path
                  // className="st1"
                  d="M16.5,10h-1V7c0-1.9-1.6-3.5-3.5-3.5S8.5,5.1,8.5,7v3h-1V7c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5V10z"
                />
                <path
                  // className="st1"
                  d="m12 16.5c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5zm0-2c-0.3 0-0.5 0.2-0.5 0.5s0.2 0.5 0.5 0.5 0.5-0.2 0.5-0.5-0.2-0.5-0.5-0.5z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.PasswordDiv}>
          <div className={styles.floatingLabel2}>
            <input
              className={confirmPasswordClass}
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              onChange={eventHandler}
              value={data.confirmPassword}
              onBlur={blurHandler}
              autoComplete="new-password"
            />
            <label className={styles.InputLabel} htmlFor="confirmPassword">
              Confirm password
            </label>
            <div className={styles.icon}>
              {/* <img src={lockLogo} /> */}
              <svg viewBox="0 0 24 24">
                <path
                  // className="st1"
                  d="M19,21H5V9h14V21z M6,20h12V10H6V20z"
                />
                <path
                  // className="st1"
                  d="M16.5,10h-1V7c0-1.9-1.6-3.5-3.5-3.5S8.5,5.1,8.5,7v3h-1V7c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5V10z"
                />
                <path
                  // className="st1"
                  d="m12 16.5c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5zm0-2c-0.3 0-0.5 0.2-0.5 0.5s0.2 0.5 0.5 0.5 0.5-0.2 0.5-0.5-0.2-0.5-0.5-0.5z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.signUpDiv}>
          <button className={styles.SubmitBtn}  onClick={submit}>
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddAdmin;
