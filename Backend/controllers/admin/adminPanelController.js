const adminDB = require('../../models/admin');
const catchAsync = require('./../../utilities/catchAsync');
const AppError = require('./../../utilities/appError');
const APIFeatures = require('./../../utilities/APIFeatures');

exports.getAllAdmins = catchAsync(async (req, res, next) => {
	// console.log(req.query);
	const features = new APIFeatures(adminDB.find(), req.query)
		.filter()
		.sort()
		.fieldLimit()
		.paging();
	const admins = await features.query;

	return res.status(200).json({
		status: 'success',
		data: admins,
	});
});

// exports.createAdmin = catchAsync(async (req, res, next) => {
// 	// refrencing the admin to its country instance in countryDB
// 	const country = await countryDB.findOne({
// 		country_name: `${req.body.countryName}`,
// 	});

// 	if (country === 0) {
// 		return next(new AppError('Please create the country first', 404));
// 	}
// 	const countryId = country.id;

// 	const {
// 		firstName,
// 		lastName,
// 		adminType,
// 		countryName,
// 		cityName,
// 		phoneNumber,
// 		email,
// 	} = req.body;

// 	const newAdmin = new adminDB({
// 		admin_type: adminType,
// 		first_name: firstName,
// 		last_name: lastName,
// 		phone_number: phoneNumber,
// 		email: email,
// 		admin_City: cityName,
// 		admin_country: countryName,
// 		admin_country_ref: countryId,
// 	});

// 	await newAdmin.save();

// 	return res.status(201).json({
// 		status: 'success',
// 		message: 'admin created successfuly',
// 	});
// });

// not complete
exports.CurrentAdmin = catchAsync(async (req, res, next) => {
	const admin = adminDB.findOne().select(['-password', '-id']);
	if (!admin) {
		return next(new AppError('no admin found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: admin,
	});
});

exports.searchAdmins = catchAsync(async (req, res, next) => {
	const name = req.body.fullName;
	const regex = new RegExp(name, 'ig'); // flag i :> case insensetive & g:> return all the matchings
	req.query.filter = {
		full_name: regex,
		admin_country: `${req.body.countryName}`,
		admin_City: `${req.body.cityName}`,
		admin_type: `${req.body.adminType}`,
	};
	req.query.sort = 'createdAt';
	req.query.fields =
		'full_name,admin_country,admin_City,admin_type,email,phone_number';
	next();

	res.status(200).json({
		status: 'success',
	});
});
