import styles from "../styles/userLoginAndSignup.module.css";

import logoIcon from "../images/Maham2.png";
import backgroundImage from "../images/Frame 110 (7) 1.png";
import showPasswordIcon from "../images/eye-alt-svgrepo-com.svg";
import hidePasswordIcon from "../images/eye-slash-alt-svgrepo-com.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Timer from "../components/general/Timer";
import warningIcon from "../images/warning-attention-red-svgrepo-com.svg";
import googleIcon from "../images/google-color-svgrepo-com.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../util/firebase";

const UserLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = async () => {
    if (data.email == "" || !data.email.includes("@") || data.password == "") {
      return;
    }
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const response = await fetch(
      "http://localhost:5000/user/auth/verification",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: formData,
      },
      { withCredentials: true }
    );
    if (response.ok) {
      setCodeSent(true);
      setError();
      setConfirmation(true);
    }
    if (response.status == 401) {
      setError("Email or password is wrong");
    }
  };

  const submitVerify = async () => {
    if (
      data.email == "" ||
      !data.email.includes("@") ||
      data.password == "" ||
      otp == ""
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("verificationCode", otp);
    const response = await fetch(
      "http://localhost:5000/user/auth/login",
      {
        method: "POST",
        body: formData,
        mode: "cors",
        credentials: "include",
      },
      { withCredentials: true }
    );
    if (response.ok) {
      navigate("/userpanel");
    }
    if (response.status == 403) {
      setError("Code is invalid");
    }
  };

  const googleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <div className={styles.LogIn}>
        <div className={styles.Side1}>
          <img src={backgroundImage} className={styles.SideBackground} />
          <div className={styles.WelcomeDiv}>
            <p className={styles.WelcomeP}>Wellcome !</p>
            <p className={styles.InfoP}>
              Welcome to a dynamic hub tailored for real estate enthusiasts and
              sales professionals like you! Join our vibrant community and
              unlock a world of possibilities. Signing up is quick and easy.
              Just fill out the form and start your journey with us.We're
              thrilled to extend an invitation for you to be a part of our
              vibrant real estate sales community. Within this platform, you'll
              not only connect with fellow professionals but also gain access to
              valuable resources, insights, and networking opportunities that
              can propel your real estate sales to new heights.
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
              <Link to="/signup">
                <button className={styles.LogInBtn}>Sign up</button>
              </Link>
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
            <h5 className={styles.SignUpInfo3}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/signup"
              >
                Don't have an account? click here
              </Link>
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
                type={showPassword ? "text" : "password"}
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
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                className={styles.ShowAndHideIcon}
                onClick={toggleShowPassword}
              />
              {/* <!--  --> */}
              {error == "Email or password is wrong" && (
                <div className={styles.WarningDiv}>
                  <img className={styles.WarningIcon} src={warningIcon} />
                  <p className={styles.WarningP}>email or password is wrong</p>
                </div>
              )}
              {/* <!--  --> */}
            </div>
            <div className={styles.SinUpBtnDiv}>
              <button className={styles.Side2LogInBtn} onClick={submitLogin}>
                <div className={styles.InsideBtnLogIn}>Log in</div>
              </button>
            </div>
            <hr className={styles.LogInHr} />
            <p className={styles.OrP}>Or</p>
            <button className={styles.googleSignInBtn} onClick={googleLogin}>
              <img src={googleIcon} className={styles.googleIcon} />
              sign in with google
              {/* <GoogleOAuthProvider clientId="">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    googleLogin(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider> */}
            </button>
            <a href="#" className={styles.ForgotP}>
              forgot your password ? click here
            </a>
          </div>
        </div>
      </div>
      {confirmation && (
        <>
          <div
            className={styles.VerificationOverlay}
            onClick={() => setConfirmation(false)}
          ></div>
          <div className={styles.BodyVerification}>
            <div className={styles.verificationDiv}>
              {/* <!--  --> */}
              {error == "Code is invalid" && (
                <div className={styles.WarningDiv2}>
                  <img className={styles.WarningIcon2} src={warningIcon} />
                  <p className={styles.WarningP2}>code is invalid</p>
                </div>
              )}

              {/* <!--  --> */}
              <div
                className={styles.CloseVerification}
                onClick={() => setConfirmation(false)}
              >
                &times;
              </div>
              <h3>Enter verification code</h3>
              <span>
                <p className={styles.VeriP1}>We've sent a code to</p>
                <p className={styles.VeriP2}>{data.email}</p>
              </span>

              <div className={styles.Container}>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  // renderSeparator={<span> </span>}
                  renderInput={(props) => <input {...props} style={{}} />}
                  inputType="tel"
                  // shouldAutoFocus="true"
                  containerStyle={styles.inputfield}
                  inputStyle={styles.input}
                />
              </div>

              <a href="#">
                Didn't get code ?{" "}
                {codeSent ? (
                  <Timer onFinish={() => setCodeSent(false)} />
                ) : (
                  "Click"
                )}{" "}
                to resend
              </a>
              <button className={styles.VerifyBtn} onClick={submitVerify}>
                <div className={styles.InsideVerifyBtn}>verify</div>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserLogin;
