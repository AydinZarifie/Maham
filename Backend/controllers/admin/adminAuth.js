const bcrypt = require('bcryptjs');
const adminDB = require('../../models/admin');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/appError');
const { promisify } = require('util');

const signToken = (email, adminId) => {
	return jwt.sign({ email, adminId }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.signUp = catchAsync(async (req, res, next) => {
	// if (validationResult(req).isEmpty()) {
	// 	return next(new AppError('validation errors on req', 422));
	// }

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

exports.logIn = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	// const email = req.body.email;
	// const password = req.body.password;

	// 1) check if email and password exists
	if (!email || !password) {
		return next(new AppError('please provide email and password', 400));
	}

	// 2) check if user exists && password is correct
	const admin = await adminDB.findOne({ email }).select('+password');

	// password is not selected in database by default , to select it in this specific situation we use .select()
	if (!admin || !(await admin.correctPassword(password, admin.password))) {
		return next(
			new AppError('username or password is incorrect ', 401) //not authorized
		);
	}

	// 3) if everything okay , create & send token to client
	const token = await signToken(email, admin._id);

	return res.status(202).json({
		status: 'success',
		token: token,
		adminId: admin._id,
	});
});

/// will be completed
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
