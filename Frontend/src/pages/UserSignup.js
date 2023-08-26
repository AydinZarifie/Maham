import styles from "../styles/userLoginAndSignup.module.css";

import logoIcon from "../images/Maham2.png";
import backgroundImage from "../images/Frame 110 (7) 1.png";
import { useState } from "react";

const UserSignup = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = async () => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    const response = await fetch("url", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
    }
  };

  return (
    <div className={styles.SignUp}>
      <div className={styles.Side1}>
        <img src={backgroundImage} className={styles.SideBackground} />
        <div className={styles.WelcomeDiv}>
          <p className={styles.WelcomeP}>Wellcome !</p>
          <p className={styles.InfoP}>
            Welcome to a dynamic hub tailored for real estate enthusiasts and
            sales professionals like you! Join our vibrant community and unlock
            a world of possibilities. Signing up is quick and easy. Just fill
            out the form and start your journey with us.We're thrilled to extend
            an invitation for you to be a part of our vibrant real estate sales
            community. Within this platform, you'll not only connect with fellow
            professionals but also gain access to valuable resources, insights,
            and networking opportunities that can propel your real estate sales
            to new heights.
          </p>

          <p className={styles.InfoP}>
            As a trusted real estate platform, we operate within the framework
            of our Terms of Service and Privacy Policy. Your confidential
            information is treated with the utmost care and is shielded using
            advanced security measures.Once registered, you can log in using
            your email and password. Should you need assistance or have
            questions, our Help Center is at your service. Ready to embark on
            your real estate journey? Fill in the details above and hit the
            "Sign Up" button to join the ranks of property enthusiasts and
            investors on our platform!
          </p>

          <p className={styles.InfoP}>
            If you already have an account, you can log in
          </p>
          <div className={styles.LogInBtnDiv}>
            <button className={styles.LogInBtn} onClick="LogInShow()">
              Log in
            </button>
          </div>
        </div>
      </div>
      <div className={styles.BodySide2}>
        <div className={styles.LogoDiv}>
          <img className={styles.Logo} src={logoIcon} />
          <h1 className={styles.Title}>MAHAM</h1>
        </div>
        <div className={styles.Side2}>
          <h2 className={styles.SignUpTitle}>Sign Up</h2>

          <h5 className={styles.SignUpInfo}>Welcome to our signup page!</h5>
          <h5 className={styles.SignUpInfo2}>
            To create your account, please provide the following information:
          </h5>
          <h5 className={styles.SignUpInfo3} onClick="LogInShow()">
            Do you already have an account? click here
          </h5>
          <div className={styles.FAndLDiv}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="Email"
                value=""
                className={styles.Inputs}
              />
              <label className={styles.Label} for="Email">
                <div className={styles.Text}>First name</div>
              </label>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="Email"
                value=""
                className={styles.Inputs}
              />
              <label className={styles.Label} for="Email">
                <div className={styles.Text}>Last name</div>
              </label>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input type="email" id="Email" value="" className={styles.Inputs} />
            <label className={styles.Label} for="Email">
              <div className={styles.Text}>Email</div>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              id="Email"
              value=""
              className={`${styles.Inputs} ${styles.PasswordInputs}`}
            />
            <label className={styles.Label} for="Email">
              <div className={styles.Text}>Password</div>
            </label>
            <img
              src="../public/img/eye-alt-svgrepo-com.svg"
              className={styles.ShowAndHideIcon}
              onClick="togglePasswordVisibility()"
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              id="Email"
              value=""
              className={`${styles.Inputs} ${styles.PasswordInputs}`}
            />
            <label className={styles.Label} for="Email">
              <div className={styles.Text}>Confirm password</div>
            </label>
            <img
              src="../public/img/eye-alt-svgrepo-com.svg"
              className={styles.ShowAndHideIcon}
              onClick="togglePasswordVisibility()"
            />
          </div>
          <div className={styles.SinUpBtnDiv}>
            <button className={styles.SignUpBtn}>
              <div className={styles.InsideBtn}>Sign up</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
