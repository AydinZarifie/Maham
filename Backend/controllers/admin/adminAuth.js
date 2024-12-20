const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
/////////////////////////////////////////////////////////////////
const adminDB = require('../../models/admin');
//////////////////////////// generateToken
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');
const sendEmail = require('./../../utilities/sendEmail');
const generateToken = require('./../../utilities/token/admin/generateToken');
const verifyRefreshToken = require('../../utilities/token/admin/verifyRefreshToken');
const signAccessToken = require('./../../utilities/token/admin/signAccessToken');
const { formatStr } = require('../../utilities/mint.js');
//////////////////////////////////////////////////////////////////

exports.signupAdmin = async (req, res, next) => {
	try {
		console.log("hello");
		console.log("hi");
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
			country,
			city,
			wallet,
		} = req.body;

		if (password !== confirmPassword) {
			return next(
				new AppError('password and password confirmation does not match', 401)
			);
		}
		const hashedPassword = await bcrypt.hash(password, 8);
		const admin = new adminDB({
			first_name: formatStr(firstName),
			last_name: formatStr(lastName),
			password: hashedPassword,
			admin_type: formatStr(adminType),
			phone_number: phoneNumber,
			email: formatStr(email),
			country_name: formatStr(country),
			city_name: formatStr(city),
			wallet: wallet,
		});
		await admin.save();

		return res.status(202).json({
			status: 'success',
			message: 'signed up successfully',
		});
	} catch (error) {
		console.log(error.message);
		return res.status(401).json({
			message: 'email or phone number already exist',
		});
	}
};

exports.loginAdmin = catchAsync(async (req, res, next) => {
	// 1) validate the request body

	const error = validationResult(req);
	if (!error.isEmpty()) {
		console.log(error.array());
		return res.status(405).json({
			message: 'Error 405',
		});
	}
	const { password, email, verificationCode } = req.body;
	const verificationCodeSession = req.session.verificationCode;

	// 2) check if email or password provided
	if (!email || !password) {
		return next(new AppError('please provide email and password', 400));
	}

	// 3) check if user exists
	const admin = await adminDB.findOne({ email }).select('+password');

	const adminInfo = {
		adminType: admin.admin_type,
		firstName: admin.first_name,
		lastName: admin.last_name,
	};

	if (!admin) {
		return next(new AppError('admin not found', 405));
	}
	// 4) check if password is correct
	const isEqual = bcrypt.compare(password, admin.password);
	if (!isEqual) {
		return next(
			new AppError('email or password is incorrect ', 405) //not authorized
		);
	}

	console.log(verificationCode);
	// 5) check if cookie expired
	if (!verificationCodeSession) {
		return next(new AppError('verification code has expired, try again.', 402));
	}

	// 6) validate the verificaion code
	if (verificationCode !== verificationCodeSession.toString()) {
		return next(new AppError('verification code is not valid', 401));
	}
	// 7) refresh and access token
	const { accessToken, refreshToken } = await generateToken(admin);

	res.cookie('jwt', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 7 * 60 * 60 * 1000, // 7 Hours
	});

	// **** putting the token within cookie and then destroying the whole SESSION ? why.

	await req.session.destroy((err) => {
		if (err) {
			console.log('Failed to destroy session');
		}
	});
	return res.status(202).json({
		status: 'success',
		token: accessToken,
		adminData: adminInfo,
	});
});

exports.logoutAdmin = catchAsync(async (req, res, next) => {
	const cookie = req.cookies;

	if (!cookie?.jwt) {
		return next(new AppError('cookie does not exists!', 204));
	}

	await res.clearCookie('jwt', {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
	});

	return res.status(200).json({
		status: 'success',
		message: 'logged out successfully!',
	});
});

exports.adminVerificationCode = catchAsync(async (req, res, next) => {
	try {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			console.log(error.array());
			return res.status(405).json({
				message: 'Error 405',
			});
		}
		const { email, password } = req.body;

		console.log(email);

		const admin = await adminDB.findOne({ email }).select('+password');

		if (!admin) {
			return next(new AppError('Wrong email!', 405));
		}

		const isEqual = bcrypt.compare(password, admin.password);

		if (!isEqual) {
			return next(new AppError('Wrong password!', 405));
		}

		const verificationCode = Math.floor(100000 + Math.random() * 9000);

		req.session.verificationCode = verificationCode;

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

exports.adminRefreshToken = catchAsync(async (req, res, next) => {
	const cookie = req.cookies;
	if (!cookie?.jwt) {
		return next(new AppError('cookieis is empty!', 403));
	}

	const refreshToken = cookie.jwt;

	const decode = await verifyRefreshToken(refreshToken);

	if (!decode) {
		return next(new AppError('refreshToken in not valid', 403));
	}

	console.log(decode);

	const admin = await adminDB.findOne({ email: decode.email });
	if (!admin) {
		return next(new AppError('Unauthorized', 401));
	}

	const accessToken = await signAccessToken(admin);

	return res.status(201).json(accessToken);
});

exports.getEditAdminProfileInfo = catchAsync(async (req, res) => {
	const admin = await adminDB.findOne({ email: req.email });
	console.log(admin);
	return res.status(200).json({
		message: 'Success',
		admin: admin,
	});
});

exports.editAdminProfileInfo = catchAsync(async (req, res, next) => {
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	if (password !== confirmPassword && (!password || !confirmPassword)) {
		return next(new AppError('password and confirm password not equal!', 401));
	}

	const admin = await adminDB.findById(req._id);

	if (!admin) {
		return next(new AppError('admin not found!', 401));
	}

	const hashedPassword = await bcrypt.hash(password, process.env.HASH_NUMBER);
	console.log(hashedPassword);

	admin.password = hashedPassword;
	await admin.save();

	return res.status(200).json({
		message: 'Success',
	});
});

exports.verifyAdminAccessTokenProtectedRoute = async (req, res) => {
	try {
		const accessToken = req.body.token;

		if (!accessToken) {
			return res.status(401).json({
				message: 'accessToken was empty',
			});
		}

		const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

		if (!decode.email || !decode.roles) {
			return res.status(401).json(false);
		} else {
			return res.status(200).json(true);
		}
	} catch (error) {
		res.status(400).json({
			message: 'not valid token',
		});
	}
};
	
exports.checkAdminAuthorization = catchAsync(async (req, res, next) => {

	console.log(req.email);
	console.log(req.body.wallet);
	if (!req.email) {
		return next(new AppError('Email has not been provided', 400));
	} else if (!req.body.wallet) {
		return next(new AppError('Wallet ID has not been provided', 400));
	}

	

	const admin = await adminDB.findOne({ email: req.email });

	if (!admin) {
		console.log(`Unauthorized action for email: ${req.email}`);
		return next(new AppError('Not authorized - Admin not found', 403));
	}

	// Check if walletId exists in the admin's wallet array
	if (!admin.wallet.includes(req.body.wallet)) {
	
		console.log(
			`Unauthorized action for email: ${req.email}, walletId: ${req.body.wallet}`
		);
		return next(
			new AppError(
				"Not authorized - Wallet ID not found in admin's wallet",
				403
			)
		);
	}

	console.log(
		`Authorized - email: ${req.email}, walletId: ${req.body.wallet}`
	);

	return res.status(200).json({
		message :  "success"
	});
	// we are not returning any response
	// because if we want to return a value that indicates that admin is authorized
	// like as True or False , it WILL NOT be practical and secure
});
