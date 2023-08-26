import styles from "../styles/userLoginAndSignup.module.css";

import logoIcon from "../images/Maham2.png";
import backgroundImage from "../images/Frame 110 (7) 1.png";
import showPasswordIcon from "../images/eye-alt-svgrepo-com.svg";
import hidePasswordIcon from "../images/eye-slash-alt-svgrepo-com.svg";
import googleIcon from "../images/google-color-svgrepo-com.svg";
import { useState } from "react";

const UserLogin = () => {
  const [data, setData] = useState({ email: "", password: "", code: "" });
  const [confirmation, setConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = async () => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const response = await fetch("url", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
    }
  };

  return (
    <div className={styles.LogIn}>
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
            advanced security measures. Once registered, you can log in using
            your email and password. Should you need assistance or have
            questions, our Help Center is at your service.
          </p>

          <p className={styles.InfoP}>
            If you do not have an account, you can Sign up
          </p>
          <div className={styles.LogInBtnDiv}>
            <button className={styles.LogInBtn} onClick="SignUpShow()">
              Sign up
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
          <h2 className={styles.SignUpTitle}>Log In</h2>

          <h5 className={styles.SignUpInfo}>Welcome to our login page!</h5>
          <h5 className={styles.SignUpInfo2}>
            To login to the user account , please provide the following
            information:
          </h5>
          <h5 className={styles.SignUpInfo3} onClick="SignUpShow()">
            Don't have an account? click here
          </h5>
          <div className={styles.inputContainer}>
            <input
              type="email"
              id="Email"
              name="email"
              value={data.email}
              onChange={eventHandler}
              className={styles.Inputs}
            />
            <label className={styles.Label} htmlFor="Email">
              <div className={styles.Text}>Email</div>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={eventHandler}
              className={`${styles.Inputs} ${styles.PasswordInputs}`}
            />
            <label className={styles.Label} htmlFor="password">
              <div className={styles.Text}>Password</div>
            </label>
            <img
              src="../public/img/eye-alt-svgrepo-com.svg"
              className={styles.ShowAndHideIcon}
              onClick="togglePasswordVisibility()"
            />
          </div>
          <div className={styles.SinUpBtnDiv}>
            <button
              className={styles.Side2LogInBtn}
              onClick="ShowVerification()"
            >
              <div className={styles.InsideBtnLogIn}>Log in</div>
            </button>
          </div>
          <hr className={styles.LogInHr} />
          <p className={styles.OrP}>Or</p>
          <button className={styles.googleSignInBtn}>
            <img src={googleIcon} className={styles.googleIcon} />
            sign in with google
          </button>
          <a href="#" className={styles.ForgotP}>
            forgot your password ? click here
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
