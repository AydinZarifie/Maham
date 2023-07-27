const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { promisify } = require('util');
/////////////////////////////////////////////////////
const userDB = require('../../models/user');
/////////////////////////
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');
const sendEmail = require('./../../utilities/sendEmail');
const generateToken = require('./../../utilities/token/generateToken');
const verifyRefreshToken = require('./../../utilities/token/verifyRefreshToken');
const signAccessToken = require('./../../utilities/token/signAccessToken');
/////////////////////////////////////////////////////

const signToken = (email, userId) => {
	return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
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
		birthDate,
		phoneNumber,
		country,
		city,
	} = req.body;

	if (password !== confirmPassword) {
		return next(
			new AppError('password and password confirmation does not match', 401)
		);
	}

	// if (password !== confirmPassword) {
	// 	const err = new Error('Password and confirm password was diffrent');
	// 	throw err;
	// }

	const hashedPassword = await bcrypt.hash(password, 12);

	const user = new userDB({
		first_name: firstName,
		last_name: lastName,
		password: hashedPassword,
		birth_date: birthDate,
		phone_number: phoneNumber,
		email: email,
		country: country,
		city: city,
	});

	await user.save();

	return res.status(202).json({
		status: 'success',
		message: 'signed up successfully',
	});
	// catch (error) {}
});

exports.logIn = catchAsync(async (req, res, next) => {
	// 1) validate the request body
	const error = validationResult(req);
	if (!error.isEmpty()) {
		console.log(error.array());
		return res.status(422).json({
			message: 'Error 422',
		});
	}

	const { password, email, verificationCode } = req.body;
	const verificationCodeSession = req.session.verificationCode;

	// 2) check if email or password provided
	if (!email || !password) {
		return next(new AppError('please provide email and password', 400));
	}

	// 3) check if user exists && password is correct
	const user = await userDB.findOne({ email }).select('+password');

	if (!user) {
		return next(new AppError('user not found', 405));
	}

	// 4) check if password is correct
	const isEqual = await bcrypt.compare(password, user.password);
	if (!isEqual) {
		return next(
			new AppError('email or password is incorrect ', 405) //not authorized
		);
	}

	// 5) check if cookie expired
	if (!req.session.verificationCode) {
		return next(new AppError('cookie has expired', 402));
	}

	// 6) validate the verificaion code
	if (verificationCode !== verificationCodeSession.toString()) {
		return next(new AppError('verification code is not valid', 401));
	}

	// 7) refresh and access token
	const { accessToken, refreshToken } = await generateToken(user);

	res.cookie('jwt', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 7 * 60 * 60 * 100,
	});

	// **** putting the token within cookie and then destroying the whole SESSION ? why.

	req.session.destroy((err) => {
		if (err) {
			console.log('Failed to destroy the session');
		}
	});

	return res.status(202).json({
		status: 'success',
		token: accessToken,
		userId: user._id,
	});
});

exports.logout = catchAsync(async (req, res, next) => {
	const cookie = req.cookies;

	if (!cookie?.jwt) {
		return next(new AppError('cookie does not exists!', 204));
	}

	res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });

	return res
		.status(200)
		.json({ status: 'success', message: 'logged out successfully!' });
});

exports.verificationCode = catchAsync(async (req, res, next) => {
	try {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			console.log(error.array());
			return res.status(405).json({
				message: 'Error 405',
			});
		}
		const { email, password } = req.body;

		const user = await userDB.findOne({ email }).select('+password');
		if (!user) {
			return next(new AppError('Wrong email!', 405));
		}

		const isEqual = await bcrypt.compare(password, user.password);

		if (!isEqual) {
			return next(new AppError('Wrong password!', 405));
		}

		const verificationCode = Math.floor(100000 + Math.random() * 9000);

		res.session.verificationCode = verificationCode;

		console.log(verificationCode);

		const mailOptions = {
			email: email,
			subject: 'Ver',
			text: 'hello there',
			verificationCode,
		};

		await sendEmail(mailOptions);

		return res.status(201).json({
			status: 'success',
			message: `Email sent to ${email} `,
		});
	} catch (err) {
		console.log(err);
	}
});

exports.refreshToken = catchAsync(async (req, res, next) => {
	const cookie = req.cookies;
	if (!cookie?.jwt) {
		return next(new AppError('cookie does not exists!', 204));
	}

	const refreshToken = cookie.jwt;

	const decode = await verifyRefreshToken(refreshToken);
	if (!decode) {
		return next(new AppError('refreshToken in not valid', 403));
	}

	console.log(decode);

	const user = await userDB.findOne({ email: decode.email });
	if (!user) {
		return next(new AppError('Unauthorization', 401));
	}

	const accessToken = await signAccessToken(user);

	return res.status(201).json(accessToken);
});
