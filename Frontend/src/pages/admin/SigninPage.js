import styles from "../../styles/signin.module.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import image from "../../images/desktop-wallpaper-architecture-building-minimalism-glass-design-construction-facade-thumbnail.jpg";

const Signin = () => {
  const navigate = useNavigate();

  const [touched, setTouched] = useState({
    username: false,
    password: false,
    code: false,
  });

  const [error, setError] = useState(null);

  const [input, setInput] = useState({
    username: "",
    password: "",
    code: "",
  });

  const [isSendingSms, setIsSendingSms] = useState(false);
  const [smsCountdown, setSmsCountdown] = useState(60);

  const enteredUsernameIsValid = input.username.trim() !== "";
  const enteredPasswordIsValid = input.password.trim() !== "";
  const enteredCodeIsValid = input.code.trim().length == 6;

  const usernameIsInvalid = !enteredUsernameIsValid && touched.username;
  const passwordIsInvalid = !enteredPasswordIsValid && touched.password;
  const codeIsInvalid = !enteredCodeIsValid && touched.code;

  const eventHandler = (event) => {
    const { name, value } = event.target;

    if (name == "code") {
      if (value.length >= 6) {
        const newValue = value.slice(0, 6);
        setInput((prev) => ({ ...prev, [name]: newValue }));
      } else {
        setInput((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSendSms = async (event) => {
    event.preventDefault();

    setTouched({
      username: true,
      password: true,
    });

    if (!(enteredUsernameIsValid && enteredPasswordIsValid)) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/admin/auth/verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: input.username,
            password: input.password,
          }),
        },
        { withCredentials: true }
      );

      if (response.ok) {
        setIsSendingSms(true);
        setSmsCountdown(60);

        const countdownInterval = setInterval(() => {
          setSmsCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          setIsSendingSms(false);
        }, 60000);
      }
      if (response.status == 405) {
        setError("Email or password is not correct");
      }
    } catch (error) {
      console.error("Failed to send SMS!", error);
      // setError(error);
    }
  };

  let formIsValid = false;

  if (enteredUsernameIsValid && enteredPasswordIsValid && enteredCodeIsValid) {
    formIsValid = true;
  }

  const handleSignup = async (event) => {
    setTouched({
      username: true,
      password: true,
      code: true,
    });

    if (!formIsValid) {
      return;
    }

    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/admin/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: input.username,
            password: input.password,
            code: input.code,
          }),
        },
        { withCredentials: true }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log("Signup successful!", data);
        const token = data.token;
        const name = data.name;
        const type = data.type;
        localStorage.setItem("token", token);
        // localStorage.setItem('name',name)
        // localStorage.setItem('type',type)
        navigate("/admin");
      }
      if (response.status == 405) {
        setError("Email or password is not correct");
      }
      if (response.status == 401) {
        setError("Entered code is invalid");
      }
    } catch (error) {
      // console.error("Signup failed!", error);
      // setError("Entered code is invalid");
    }
  };

  const usernameClass = usernameIsInvalid
    ? `${styles.invalid} ${styles.InputAdmin} `
    : `${styles.InputAdmin} `;
  const passwordClass = passwordIsInvalid
    ? `${styles.invalid} ${styles.InputAdmin} `
    : `${styles.InputAdmin} `;
  const codeClass = codeIsInvalid
    ? ` ${styles.invalid2} `
    : `${styles.VcodeInput} `;
  const buttonClass = formIsValid
    ? `${styles.activeButton}  `
    : `${styles.SubmitBtn}`;

  return (
    <div className={styles.AdminBody}>
      <div className={styles.session}>
        <div className={styles.left}>
          <img src={image} />
        </div>
        <form className={styles.SignIn}>
          <h4 className={styles.AdminH4}>
            Admin <span>Panel</span>
          </h4>
          <p className={styles.WelcomeP}>
            Welcome back! Sign in to your account to complete your tasks:
          </p>

          <div className={styles.floatingLabel}>
            {error && <p className={styles.PWrong}>{error}</p>}

            <input
              className={usernameClass}
              placeholder="Email"
              type="text"
              name="username"
              value={input.username}
              onChange={eventHandler}
              //onBlur={blurHandler}
              id="UserName"
              required
            />
            <label className={styles.InputLabel} htmlFor="UserName">
              Email
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
              className={passwordClass}
              placeholder="Password"
              type="password"
              name="password"
              value={input.password}
              onChange={eventHandler}
              //onBlur={blurHandler}
              id="password"
              required
            />
            <label className={styles.InputLabel} htmlFor="password">
              Password
            </label>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24">
                <path
                  className={styles.st1}
                  d="M19,21H5V9h14V21z M6,20h12V10H6V20z"
                />
                <path
                  className={styles.st1}
                  d="M16.5,10h-1V7c0-1.9-1.6-3.5-3.5-3.5S8.5,5.1,8.5,7v3h-1V7c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5V10z"
                />
                <path
                  className={styles.st1}
                  d="m12 16.5c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5zm0-2c-0.3 0-0.5 0.2-0.5 0.5s0.2 0.5 0.5 0.5 0.5-0.2 0.5-0.5-0.2-0.5-0.5-0.5z"
                />
              </svg>
            </div>
          </div>
          <div className={styles.VerifyCode}>
            <input
              className={codeClass}
              type="number"
              min="0"
              max="999999"
              name="code"
              value={input.code}
              onChange={eventHandler}
              //onBlur={blurHandler}
            />
            <button
              className={styles.VCodeBtn}
              onClick={handleSendSms}
              disabled={
                isSendingSms ||
                !(enteredUsernameIsValid && enteredPasswordIsValid)
              }
            >
              {isSendingSms ? `Resend Email in ${smsCountdown}s` : "Send Email"}
            </button>
            <span className={styles.timer}>{smsCountdown}</span>
            <h3 className={styles.SH3}>s</h3>
          </div>
          <button
            className={buttonClass}
            type="submit"
            onClick={handleSignup}
            disabled={!formIsValid}
          >
            Sign In
          </button>
          <a href="#" className={styles.discrete}>
            Forget password
          </a>
        </form>
      </div>
    </div>
  );
};

export default Signin;
