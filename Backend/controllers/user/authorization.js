const userDB = require('../../models/user');
const sendEmail = require('../../utilities/sendEmail');
const AppError = require('../../utilities/error/appError');
const catchAsync = require('../../utilities/error/catchAsync');

exports.userAuthorization = catchAsync(async (req, res, next) => {
	//// 2)  modify the request object >>
	// (A): check for request object to only contain allowed fields
	// (B): change camelCase inputs into under_score_base
	const newObj = filterObj(req.body, [
		'firstName',
		'lastName',
		'country',
		'city',
		'email',
		'birthDate',
		'phoneNumber',
		'passportId',
	]);

	if (!req.files.images) {
		return next(new AppError('please provide an image', 400));
	}

	const passport_image = req.files.images.map((el) => {
		return el.path;
	});

	const neewObj = {
		...newObj,
		passport_image,
	};

	const user = await userDB.create(neewObj);

	if (!user) {
		return next(new AppError('an error equired during the verification', 400));
	}

	const verificationCode = Math.floor(100000 + Math.random() * 9000);

	res.session.verificationCode = verificationCode;

	console.log(verificationCode);

	const mailOptions = {
		email: email,
		subject: 'Ver',
		text: 'verification code sent to the email',
		verificationCode,
	};

	await sendEmail(mailOptions);

	return res.status(202).json({
		status: 'success',
		data: user.email,
	});
});

exports.verifyUser = catchAsync(async (req, res, next) => {
	const { verificationCode } = req.body;
	const verificationCodeSession = req.session.verificationCode;

	// 1) check if verification code is expired
	if (!req.session.verificationCode) {
		return next(new AppError('verification code has expired, try again.', 402));
	}

	// 2) validate the verificaion code
	if (verificationCode !== verificationCodeSession.toString()) {
		return next(new AppError('verification code is not valid', 401));
	}

	// 3) once its done successfuly with verifing user , clear the verification code
	req.session.destroy((err) => {
		if (err) {
			console.log('Failed to destroy session');
		}
	});

	return res.status(202).json({
		status: 'success',
		message: 'User verified successfully',
	});
});
