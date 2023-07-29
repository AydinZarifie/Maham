const userDB = require('../../models/user');
const sendEmail = require('../../utilities/sendEmail');
const AppError = require('../../utilities/error/appError');
const catchAsync = require('../../utilities/error/catchAsync');

exports.sendVerificationCode = catchAsync(async (req, res, next) => {
	const { email } = req.body;

	if (!email) {
		return next(new AppError('please provide an email', 400));
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
	});
});

exports.authorizeUser = catchAsync(async (req, res, next) => {
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

	// 3) once its done successfuly with verifing user , clear the verification code from users session
	req.session.destroy((err) => {
		if (err) {
			console.log('Failed to destroy session');
		}
		console.log('Session destroyed succesfully ');
	});

	//// 4)  modify the request object >>
	// (A): check for request object to only contain allowed fields
	// (B): change camelCase inputs into under_score_base >> frontEnd : camelBase & backEnd : under_score_base
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

	// 5) check if required image files provided by user >> if (false) ? send error res : merge it with user's data
	if (!req.files.images) {
		return next(new AppError('please provide an image', 400));
	}

	const passport_image = req.files.images.map((el) => {
		return el.path;
	});

	const finalObj = {
		...newObj,
		passport_image,
	};

	// 6) create the user
	const user = await userDB.create(finalObj);

	if (!user) {
		return next(new AppError('an error equired during the verification', 400));
	}

	return res.status(202).json({
		status: 'success',
		message: 'succesfully authorized',
	});
});
