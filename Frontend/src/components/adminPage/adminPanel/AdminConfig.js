import styles from "../../../styles/AdminPanel.module.css";
import DeleteIcon from "../../../images/delete-2-svgrepo-com2.svg";
import EditIcon from "../../../images/edit-pencil-line-01-svgrepo-com.svg";

import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

const AdminConfig = ({ method, admin }) => {
  const { error, submitAddAdminHandler, countries, cityFetch, cities } =
    useOutletContext();

  const [walletAddresses, setWalletAddresses] = useState([]);
  const walletAddressRef = useRef();

  const [data, setData] = useState({
    type: admin ? admin.admin_type : "",
    firstName: admin ? admin.first_name : "",
    lastName: admin ? admin.last_name : "",
    email: admin ? admin.email : "",
    phoneNumber: admin ? admin.phone_number : "",
    country: admin ? admin.country_name : "",
    city: admin ? admin.city_name : "",
    password: "",
    confirmPassword: "",
    walletAddress: "",
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
    walletAddress: false,
  });

  const enteredTypeIsValid = data.type.trim() !== "";
  const enteredFirstNameIsValid = data.firstName.trim() !== "";
  const enteredLastNameIsValid = data.lastName.trim() !== "";
  const enteredEmailIsValid = data.email.trim() !== "";
  const enteredPhoneNumberIsValid = data.phoneNumber.trim() !== "";
  const enteredCountryIsValid = data.country.trim() !== "";
  const enteredCityIsValid = data.city.trim() !== "";
  const enteredPasswordIsValid = data.password.trim() !== "";
  const enteredConfirmPasswordIsValid =
    data.confirmPassword.trim() !== "" && data.password == data.confirmPassword;
  const enteredWalletAddressIsValid = data.walletAddress.trim() !== "";

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
    !enteredConfirmPasswordIsValid && touched.confirmPassword;
  const walletAddressIsInvalid =
    !enteredWalletAddressIsValid && touched.walletAddress;

  let formIsValidForAdding = false;
  let formIsValidForEditing = false;

  if (
    enteredTypeIsValid &&
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneNumberIsValid &&
    enteredCountryIsValid &&
    enteredCityIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
    //enteredWalletAddressIsValid
  ) {
    formIsValidForAdding = true;
  }

  if (
    enteredTypeIsValid &&
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneNumberIsValid &&
    enteredCountryIsValid &&
    enteredCityIsValid
    // enteredPasswordIsValid &&
    // enteredConfirmPasswordIsValid
  ) {
    formIsValidForEditing = true;
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
    event.preventDefault();

    if (admin) {
      setTouched((prev) => ({
        ...prev,
        type: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        country: true,
        city: true,
      }));
      if (!formIsValidForEditing) {
        return;
      }
    } else {
      setTouched({
        type: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        country: true,
        city: true,
        walletAddress: true,
        password: true,
        confirmPassword: true,
      });
      if (!formIsValidForAdding) {
        return;
      }
    }

    if (data.password !== data.confirmPassword) {
      // setData((prev)=>({...prev,confirmPassword:''}))
      return;
    }

    submitAddAdminHandler(
      method,
      data.type,
      data.firstName,
      data.lastName,
      data.email,
      data.phoneNumber,
      data.country,
      data.city,
      data.password,
      data.confirmPassword,
      walletAddresses,
      admin ? admin._id : null
    );
  };

  useEffect(() => {
    if (admin) {
      cityFetch(admin.country_name);
    }
  }, []);

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
  const walletAddressClass = walletAddressIsInvalid
    ? `${styles.invalid} ${styles.InputAdmin} `
    : `${styles.InputAdmin} `;

  const addToWalletAddresses = () => {
    if (walletAddresses.length < 3) {
      setWalletAddresses((prev) => [...prev, data.walletAddress]);
      setData((prev) => ({ ...prev, walletAddress: "" }));
      setTouched((prev) => ({ ...prev, walletAddress: false }));
    }
  };

  const deleteFromWalletAddresses = (walletAddress) => {
    let array = walletAddresses.filter((item) => item !== walletAddress);
    setWalletAddresses(array);
  };

  const editwalletAddressItem = (walletAddress) => {
    setData((prev) => ({ ...prev, walletAddress: walletAddress }));
    deleteFromWalletAddresses(walletAddress);
    walletAddressRef.current.focus();
  };

  return (
    <form className={styles.FormAdmin} method={method}>
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
            <option className={styles.SelectOption} value="superadmin">
              superadmin
            </option>
            <option className={styles.SelectOption} value="admin">
              admin
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
              type="email"
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
        {/*  */}
        <div className={styles.WalletAddres}>
          <div className={styles.WalletHead}>
            <h3>Admin Wallet addres</h3>
          </div>
          <div className={styles.WalletInputDiv}>
            <div className={styles.floatingLabel2}>
              <input
                className={walletAddressClass}
                placeholder="Wallet address"
                type="text"
                name="walletAddress"
                id="walletAddress"
                onChange={eventHandler}
                value={data.walletAddress}
                // onBlur={blurHandler}
                ref={walletAddressRef}
              />
              <label className={styles.InputLabel} htmlFor="walletAddress">
                Wallet addres
              </label>
              <div className={styles.icon}>
                <svg
                  fill="#000000"
                  width="64px"
                  height="64px"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000"
                  stroke-width="0.00032"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path d="M31.989 9.078c0.015-0.739-0.184-2.464-2.433-3.064l-22.576-4.519c-1.655 0-3 1.345-3 3v4.022l-1-0.002c-1.649 0.007-2.989 1.348-2.989 2.999v15.994c0 1.654 1.345 3 3 3h26.014c1.654 0 3-1.346 3-3zM5.981 4.494c0-0.522 0.402-0.952 0.913-0.996l22.063 4.465c0.008 0.004-0.164 0.56-0.965 0.55h-22.011zM30.008 27.507c0 0.552-0.448 1-1 1h-26.015c-0.552 0-1-0.448-1-1v-15.995c0-0.552 0.448-1 1-1h25.002c0.982 0 2.012-0.335 2.012-0.996v17.991h0zM5.995 17.516c-1.104 0-2 0.895-2 2s0.896 2 2 2 2-0.895 2-2-0.896-2-2-2z" />{" "}
                  </g>
                </svg>
              </div>
            </div>
            <span onClick={addToWalletAddresses}>+</span>
          </div>
          {walletAddresses &&
            walletAddresses.length > 0 &&
            walletAddresses.map((item, index) => (
              <div className={styles.AddresEditDiv}>
                <div className={styles.InputDiv}>
                  {index + 1}-
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      disabled
                      //id="WalletAddres"
                      value={item}
                      className={styles.inputs}
                    />
                    <label
                      className={styles.label}
                      //for="WalletAddres"
                    >
                      <div className={styles.text}>Wallet Addres</div>
                    </label>
                  </div>
                </div>
                <div className={styles.IconsDiv}>
                  <img
                    className={styles.DeleteIcon}
                    src={DeleteIcon}
                    onClick={() => deleteFromWalletAddresses(item)}
                  />
                  <img
                    className={styles.EditIcon}
                    src={EditIcon}
                    onClick={() => editwalletAddressItem(item)}
                  />
                </div>
              </div>
            ))}
        </div>
        {/*  */}
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
              {countries.length > 0 &&
                countries.map((country) => (
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

              {cities.length > 0 &&
                cities.map((city) => (
                  <option
                    key={city}
                    className={styles.SelectOption}
                    value={city}
                  >
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className={styles.PasswordDiv}>
          <div className={styles.floatingLabel2}>
            <input
              className={passwordClass}
              placeholder="Password"
              type="password"
              name="password"
              id="password"
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
          <button className={styles.SubmitBtn} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdminConfig;
