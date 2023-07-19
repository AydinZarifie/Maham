const adminDB = require('../../models/admin');
const catchAsync = require('./../../utilities/catchAsync');
const AppError = require('./../../utilities/appError');
const APIFeatures = require('./../../utilities/APIFeatures');
const { filterObj } = require('./../../utilities/specialFunctions');

// exports.getAllAdmins = catchAsync(async (req, res, next) => {
// 	// console.log(req.query);
// 	const features = new APIFeatures(adminDB.find(), req.query)
// 		.filter()
// 		.sort()
// 		.fieldLimit()
// 		.paging();
// 	const admins = await features.query;

// 	if (!admins) {
// 		return next(new AppError('nothing matches', 404));
// 	}

// 	return res.status(200).json({
// 		status: 'success',
// 		data: admins,
// 	});
// });

exports.getAllAdmins = catchAsync(async (req, res, next) => {
	// console.log(req.query);
	const admins = await adminDB.find().sort('createdAt');

	if (!admins) {
		return next(new AppError('nothing matches', 404));
	}

	return res.status(200).json({
		status: 'success',
		data: admins,
	});
});

// exports.searchAdmins = catchAsync(async (req, res, next) => {
// 	const name = req.body.fullName;
// 	const regex = new RegExp(name, 'i'); // flag i :> case insensetive & g:> return all the matchings
// 	req.query.filter = {
// 		// full_name: regex,
// 		admin_country: `${req.body.countryName}`,
// 		admin_City: `${req.body.cityName}`,
// 		admin_type: `${req.body.adminType}`,
// 	};
// 	req.query.fields = '-admin_country_ref -__v -updatedAt -_id';

// 	console.log(req.query);
// 	next();
// });

exports.searchAdmins = async (req, res, next) => {
	const newObj = filterObj(
		req.body,
		'admin_type',
		'admin_country',
		'admin_city',
		'full_name'
	);
	console.log(newObj);
	const name = newObj.fullName;
	const regex = new RegExp(name, 'ig'); // flag i :> case insensetive & g:> return all the matchings
	console.log(Object.keys(newObj));
	console.log(Object.values(newObj));
	console.log(Object(newObj));

	const admins = await adminDB
		.find(newObj)
		.sort('createdAt')
		.select('-admin_country_ref -__v -updatedAt -_id');

	if (admins.length === 0) {
		return next(new AppError('nothing matches', 404));
	}

	return res.status(200).json({
		status: 'success',
		results: admins.length,
		data: admins,
	});
};

// not complete
exports.currentAdmin = catchAsync(async (req, res, next) => {
	const admin = adminDB.findOne().select(['-password', '-id']);
	if (!admin) {
		return next(new AppError('no admin found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: admin,
	});
});

exports.getLockEstates = catchAsync(async (req, res) => {
	const lockEstate = await estateDB.find({ lock_position: true });
	return res.status(200).json({ data: lockEstate, message: 'hello' });
});

exports.getSellPositionEstates = catchAsync(async (req, res) => {
	const estate = await estateDB.find({ sell_position: true });
	return res.status(201).json({ data: estate });
});
