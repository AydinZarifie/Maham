const bcrypt = require('bcryptjs');
const Memcached = require('memcached');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { promisify } = require('util');
/////////////////////////////////////////////////////
const adminDB = require('../../models/admin');
/////////////////////////
const catchAsync = require('./../../utilities/catchAsync');
const AppError = require('./../../utilities/appError');
/////////////////////////////////////////////////////

const memcached = new Memcached(`localhost:${process.env.port}`);

const signToken = (email, adminId) => {
	return jwt.sign({ email, adminId }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.signUp = catchAsync(async (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		console.log(error.array());
		return res.status(422).json({
			message: 'Error 422',
		});
	}

	// getting information from request body
	const {
		firstName,
		lastName,
		password,
		email,
		confirmPassword,
		adminType,
		phoneNumber,
	} = req.body;

	if (password !== confirmPassword) {
		return next(
			new AppError('password and password confirmation doesnt match', 400)
		);
	}

	// if (password !== confirmPassword) {
	// 	const err = new Error('Password and confirm password was diffrent');
	// 	throw err;
	// }

	const hashedPassword = await bcrypt.hash(password, 12);

	const admin = new adminDB({
		firstname: firstName,
		lastname: lastName,
		password: hashedPassword,
		admin_type: adminType,
		phone_number: phoneNumber,
		email: email,
	});

	await admin.save();

	return res.status(202).json({
		status: 'success',
		message: 'signed up successfully',
	});
	// catch (error) {}
});

exports.logIn = catchAsync(async (req, res, next) => {
	const { password, inputVerificationCode } = req.body;
	const email = req.body.username;
	// const verificationCode = req.session.verificationCode;
	// console.log(verificationCode);

	// 1) check if email or password provided
	if (!email || !password) {
		return next(new AppError('please provide email and password', 400));
	}

	// 2) check if user exists && password is correct
	const admin = await adminDB.findOne({ email }).select('+password');

	if (!admin) {
		return next(new AppError('admin not found', 400));
	}

	// Retrieving the token
	memcached.get(`userToken:${admin._id}`, function (err, verificationCode) {
		if (err) {
			console.log('Error retrieving user token from Memcached:', err);
		} else {
			console.log(
				'User token retrieved successfully from Memcached:',
				verificationCode
			);
		}
	});

	const isEqual = await bcrypt.compare(password, admin.password);
	if (!isEqual) {
		return next(
			new AppError('username or password is incorrect ', 401) //not authorized
		);
	}

	if (verificationCode.toString() !== inputVerificationCode) {
		return next(new AppError('verification code was wrong', 400));
	}

	// 3) if everything okay , create & send token to client
	const token = await signToken(email, admin._id);

	return res.status(202).json({
		status: 'success',
		token: token,
		adminId: admin._id,
	});
});

exports.verificationCode = async (req, res) => {
	const email = req.body.username;
	const password = req.body.password;

	const admin = await adminDB.findOne({ email });

	if (!admin) {
		return res.status(401).json({
			message: 'email wrong',
		});
	}

	const isEqual = await bcrypt.compare(password, admin.password);

	if (!isEqual) {
		return res.status(401).json({
			message: 'password wrong',
		});
	}

	const verificationCode = Math.floor(1000 + Math.random() * 9000);

	// Storing the token
	memcached.set(
		`userToken:${admin._id}`,
		verificationCode,
		3600,
		function (err) {
			if (err) {
				console.log('Error storing user token in Memcached:', err);
			} else {
				console.log('User token stored successfully in Memcached');
			}
		}
	);

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'aydinzarifieaszo@gmail.com',
			pass: 'rwtrwybhtbugnqxc',
		},
	});

	const mailOptions = {
		from: 'aydinzarifieaszo@gmail.com',
		to: email,
		subject: 'Ver',
		html: `  
    <div
      style="
        background: linear-gradient(to left, #ef4057, #ef4077);
        min-height: 100%;
        padding-top: 20px;
        padding-bottom:20px;
        padding-left: 10px;
        padding-right: 10px;
        align-items: center;
      "
    >
      <div
        class="container"
        style="
          min-height: 300px;
          max-width: 530px;
          margin: 0 auto;
          background-color: #fff;
          padding: 10px 10px 10px 10px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          text-align:center;
        "
      >
          <img
            class="logo"
            src="cid:myImage"
            style="width: 190px; height: 70px;
             "
            alt="Logo"
          />
        <div
          class="info"
          style="
            margin-bottom: 20px;
            width: 90%;
            background-color:#ef4077;
            color: #ffffff;
            height: 40px;
            font-size: 20px;
            margin-left: 5%;
            padding-top: 14px;
            border-radius: 10px;
            text-align: center;
            padding-left: 10px;
          "
        >
          Email Safety phrase
        </div>
        <p
          style="
            text-align: left;
            font-family: URWDIN;
            font-size: 14px;
            line-height: 22px;
            text-align: left;
            color: rgba(1, 8, 30, 0.6);
            padding: 0 10px 0 10px;
          "
        >
          Dear Maham admin:
        </p>
        <p
          style="
            text-align: left;
            font-family: URWDIN;
            font-size: 14px;
            line-height: 22px;
            text-align: left;
            color: rgba(1, 8, 30, 0.6);
            padding: 0 10px 0 10px;
          "
        >
          this is your Verification code for log in :
        </p>
        <button
          style="
            background-color: transparent;
            color: #333;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            font-size: 30px;
            text-align: left;
            width: 100%;
          "
        >${verificationCode}
        </button>
        <p
          style="
            text-align: left;
            font-family: URWDIN;
            font-size: 14px;
            line-height: 22px;
            text-align: left;
            color: rgba(1, 8, 30, 0.6);
            padding: 0 10px 0 10px;
          "
        >
          This code remains valid for 10 minutes. Please do not disclose it to
          anyone (including Maham staff)
        </p>

        <div
          class="code-container"
          style="
            margin-top: -10px;
            padding: 10px 10px 0px 10px;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            text-align: left;
            border-radius: 10px;
          "
        >
        <div style="margin: 0 auto; max-width: 568px; background-color: #f9f9f9;">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0;
                  padding: 0;
                  padding-bottom: 24px;
                  text-align: center;
                "
              >
                <div
                  class="m_-5146143764419861847mj-column-per-100"
                  style="
                    font-size: 0;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          class="m_-5146143764419861847list"
                          style="
                            background: #f9f9f9;
                            font-size: 0;
                            padding: 10px 0px;
                            word-break: break-word;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                            style="
                              color: #000;
                              font-family: URWDIN;
                              font-size: 13px;
                              line-height: 22px;
                              table-layout: auto;
                              width: 100%;
                              border: none;
                            "
                          >
                            <tbody>
                              <tr>
                                <td
                                  valign="top"
                                  class="m_-5146143764419861847list-title"
                                >
                                  Account:
                                </td>
                                <td
                                  valign="top"
                                  class="m_-5146143764419861847list-content"
                                >
                                  <a
                                    href="${email}"
                                    target="_blank"
                                    >aydinzarifieaszo@gmail.com</a
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td
                                  valign="top"
                                  class="m_-5146143764419861847list-title"
                                >
                                  IP Address:
                                </td>
                                <td
                                  valign="top"
                                  class="m_-5146143764419861847list-content"
                                >
                                  5.122.183.29
                                </td>
                              </tr>
                              <tr>
                                <td
                                  valign="top"
                                  class="m_-5146143764419861847list-title"
                                >
                                  Login Platform:
                                </td>
                                <td
                                  valign="top"
                                  class="m_-5146143764419861847list-content"
                                >
                                  ANDROID
                                </td>
                              </tr>
                              <tr>
                                <td
                                  valign="top"
                                  class="m_-5146143764419861847list-title"
                                >
                                  Login Time:
                                </td>
                                <td
                                  valign="top"
                                  class="m_-5146143764419861847list-content"
                                >
                                  2021-09-06 15:18:44 (UTC+08:00)
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
        </div>
        <p
          style="
            text-align: left;
            font-family: URWDIN;
            font-size: 14px;
            line-height: 22px;
            text-align: left;
            color: rgba(1, 8, 30, 0.6);
            padding: 0 10px 0 10px;
          "
        >
          Notice: If you did not conduct this operation, your account may be
          compromised.  Please log in to your account and change your password or
          freeze your account immediately
        </p>
      </div>
    </div>`,
		attachments: [
			{
				filename: 'Maham2.png',
				path: './public/images/Maham2.png',
				cid: 'myImage', // Content ID of the image
			},
		],
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});

	return res.status(201).json({
		message: 'Success',
	});
};

// not complete
exports.resetPassword = catchAsync(async (req, res, next) => {
	// 1) Get admin based on the token
	const hashedToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const admin = await adminDB.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	// 2) If token has not expired, and there is admin, set the new password
	if (!admin) {
		return next(new AppError('Token is invalid or has expired', 400));
	}
	admin.password = req.body.password;
	admin.passwordConfirm = req.body.passwordConfirm;
	admin.passwordResetToken = undefined;
	admin.passwordResetExpires = undefined;
	await admin.save();

	// 3) Update changedPasswordAt property for the admin
	// 4) Log the admin in, send JWT
	createSendToken(admin, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) getting token and see if it is there
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// splits the string and returns back arrays of splited parts
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(
			new AppError('your are not logged in , please login to get access ', 401)
			// cause we have token , if we are logged in
		);
	}

	// 2) validate token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) check if the user is still there >> not deleted
	const currentAdmin = await adminDB.findById(decoded.adminId);
	if (!currentAdmin) {
		next(
			new AppError('the Admin belonging to this token no longer exists', 401)
		);
	}

	// 4)check if changed password after got the token
	if (currentAdmin.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError('Admin password changed recently , please login again', 401)
		);
	}

	// grant access to protected route
	next();
});
