const AppError = require("./../../utilities/error/appError");
const catchAsync = require("../../utilities/error/catchAsync");
const { formatStr } = require("../../utilities/mint.js");
const sendEmail = require("./../../utilities/sendEmail");
const generateToken = require("./../../utilities/token/client/generateToken");
const verifyRefreshToken = require("../../utilities/token/client/verifyRefreshToken");
const signAccessToken = require("./../../utilities/token/client/signAccessToken");
/////////////////////////
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const  {OAuth2Client} = require("google-auth-library")
///////////////////////////////////////////////////////
const userDB = require("../../models/user");

//initial firebase admin SDK//////////////////////////////////////////
const admin = require("firebase-admin");

const serviceAccount = require("../../utilities/FirebaseApi/hello-authentication-397508-firebase-adminsdk-2o7md-e44b839e1f.json");

admin.initializeApp({
  credential : admin.credential.cert(serviceAccount),
  client_id: '996968345379-9jbfvqc6r1re3p9k8rqo7j1n88c8oijr.apps.googleusercontent.com',
})
//////////////////////////////////////////////////////////////////////

exports.signupUser = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.status(422).json({
        message: "Error 422",
      });
    }

    // getting information from request body
    const {
      firstname,
      lastname,
      password,
      email,
      birthDate,
      confirmPassword,
      phoneNumber,
    } = req.body;

    if (password !== confirmPassword) {
      return next(
        new AppError("password and password confirmation does not match", 401)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new userDB({
      first_name: formatStr(firstname),
      last_name: formatStr(lastname),
      password: hashedPassword,
      birth_date: birthDate,
      phone_number: phoneNumber,
      email: email,
    });

    await user.save();

    return res.status(202).json({
      status: "success",
      message: "signed up successfully",
    });
  } catch (error) {
    return res.status(403).json({
      message: "email already exist",
    });
  }
};

exports.loginUser = catchAsync(async (req, res, next) => {
  // 1) validate the request body
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error.array());
    return res.status(422).json({
      message: "Error 422",
    });
  }

  const { password, email, verificationCode } = req.body;
  const verificationCodeSession = req.session.verificationCode;
  // 2) check if email or password provided
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }

  // 3) check if user exists && password is correct
  const user = await userDB.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("user not found", 401));
  }

  // 4) check if password is correct
  const isEqual = bcrypt.compare(password, user.password);
  if (!isEqual) {
    return next(
      new AppError("email or password is incorrect ", 401) //not authorized
    );
  }

  // 5) check if cookie expired
  if (!req.session.verificationCode) {
    return next(new AppError("cookie has expired", 406));
  }

  // 6) validate the verificaion code
  if (verificationCode !== verificationCodeSession.toString()) {
    return next(new AppError("verification code is not valid", 401));
  }

  // 7) refrech and access token
  const { accessToken, refreshToken } = await generateToken(user);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 60 * 60 * 1000, // 7 Hours
  });

  req.session.destroy((err) => {
    if (err) {
      console.log("Failed to destroy session");
    }
  });

  ///////////////////////////////////////////////////////////////

  return res.status(202).json({
    status: "success",
    token: accessToken,
    userId: user._id,
  });
});

exports.userVerificationCode = catchAsync(async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.status(405).json({
        message: "Error 405",
      });
    }
    const { email, password } = req.body;

    const user = await userDB.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("Wrong email!", 401));
    }

    const isEqual = bcrypt.compare(password, user.password);

    if (!isEqual) {
      return next(new AppError("Wrong password!", 401));
    }

    const verificationCode = Math.floor(100000 + Math.random() * 9000);

    req.session.verificationCode = verificationCode;

    console.log(req.session.verificationCode);

    const mailOptions = {
      email: email,
      subject: "Ver",
      text: "hello there",
      verificationCode,
    };

    await sendEmail(mailOptions);

    return res.status(201).json({
      status: "success",
      message: `Email sent to ${email} `,
    });
  } catch (err) {
    console.log(err);
  }
});

exports.logoutUser = catchAsync(async (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) {
    return next(new AppError("cookie does not exists!", 204));
  }

  await res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.status(200).json({
    status: "success",
    message: "logged out successfully!",
  });
});

exports.userRefreshToken = catchAsync(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    return next(new AppError("cookie is empty!", 403));
  }

  const refreshToken = cookie.jwt;

  const decode = await verifyRefreshToken(refreshToken);

  if (!decode) {
    return next(new AppError("refreshToken in not valid", 403));
  }

  const user = await userDB.findOne({ email: decode.email });

  if (!user) {
    return next(new AppError("Unauthorized", 401));
  }

  const accessToken = await signAccessToken(user);

  return res.status(201).json(accessToken);
});

exports.loginGoogle = async (req,res) => {

  const token = req.body.token;
  console.log(token);
  admin.auth().verifyIdToken(token).then((decode) => {
    console.log(decode);
    const email = decode.email;
    console.log(email);
  }).catch(err => {
    console.log(err.message);
  })
}