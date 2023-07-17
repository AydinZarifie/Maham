const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { promisify } = require('util');
/////////////////////////////////////////////////////
const adminDB = require('../../models/admin');
/////////////////////////
const catchAsync = require('./../../utilities/catchAsync');
const AppError = require('./../../utilities/appError');
const sendEmail = require('./../../utilities/email');
/////////////////////////////////////////////////////

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
		countryName,
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
		first_name: firstName,
		last_name: lastName,
		password: hashedPassword,
		admin_type: adminType,
		phone_number: phoneNumber,
		email: email,
		admin_country: countryName,
	});

	await admin.save();

	return res.status(202).json({
		status: 'success',
		message: 'signed up successfully',
		number: admin.testField,
	});
	// catch (error) {}
});

exports.logIn = catchAsync(async (req, res, next) => {
	const { password, email, verificationCode } = req.body;

	console.log(verificationCode);
	console.log(req.session.verification.toString());

	// 1) check if email or password provided
	if (!email || !password) {
		return next(new AppError('please provide email and password', 400));
	}

	// 3) check if user exists && password is correct
	const admin = await adminDB.findOne({ email }).select('+password');

	if (!admin) {
		return next(new AppError('admin not found', 404));
	}

	const isEqual = await bcrypt.compare(password, admin.password);
	if (!isEqual) {
		return next(
			new AppError('email or password is incorrect ', 405) //not authorized
		);
	}

	if (verificationCode !== req.session.verification.toString()) {
		return next(new AppError('verification code is not valid', 401));
	}

	///////////////////////////////////////////////////////////////

	// 3) if everything okay , create & send token to client
	const token = signToken(email, admin._id);

	return res.status(202).json({
		status: 'success',
		token: token,
		adminId: admin._id,
	});
});

exports.verificationCode = async (req, res, next) => {
	const { email, password } = req.body;

	const admin = await adminDB.findOne({ email }).select('+password');
	if (!admin) {
		return next(new AppError('Wrong email', 401));
	}

	const isEqual = await bcrypt.compare(password, admin.password);

	if (!isEqual) {
		return next(new AppError('Wrong password', 401));
	}

	const verificationCode = Math.floor(100000 + Math.random() * 9000);

	req.session.verification = verificationCode;
	console.log(verificationCode);

	const mailOptions = {
		email: email,
		subject: 'Ver',
		text: 'hello there ',
		verificationCode,
	};

	try {
		await sendEmail(mailOptions);
		return res.status(201).json({
			message: 'Success',
		});
	} catch (err) {
		console.log(err);
	}
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
