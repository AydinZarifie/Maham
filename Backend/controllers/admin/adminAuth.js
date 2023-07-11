const bcrypt = require('bcryptjs');
const adminDB = require('../../models/admin');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const catchAsync = require('./../../utilities/catchAsync');
const AppError = require('./../../utilities/appError');

const { validationResult } = require('express-validator');

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

	if (!email || !password) {
		return next(new AppError('please provide email and password', 400));
	}

	const admin = await adminDB.find({ email: email });

	if (!admin) {
		const err = new Error('admin not found');
		err.statusCode = 402;
		throw err;
	}
	const isEqual = await bcrypt.compare(password, admin[0].password);

	if (!isEqual) {
		return next(
			new AppError('username or password is incorrect ', 401) //not authorized
		);
	}

	if (req.cookies.verifyToken.toString() !== inputVerificationCode) {
		return next(
			new AppError('token is not correct', 401) //not authorized
		);
	}

	const token = jwt.sign(
		{ email: email, adminId: admin[0]._id.toString() },
		'MatbietRixineum',
		{
			expiresIn: '1h',
		}
	);

	return res.status(202).json({
		token: token,
		adminId: admin._id,
	});
});

exports.verificationCode = async (req, res) => {
	console.log('hello');

	const email = req.body.username;
	const password = req.body.password;

	console.log(email);

	const admin = await adminDB.findOne({ email }).select('+password');

	if (!admin) {
		console.log('l');
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
	res.cookie('verifyToken', verificationCode, {
		expires: new Date(Date.now() + 180000),
		httpOnly: true,
	});

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
		token: verificationCode,
	});
};
