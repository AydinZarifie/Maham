const adminDB = require('../../models/admin');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');
const { filterObj } = require('./../../utilities/specialFunctions');

exports.getAllAdmins = catchAsync(async (req, res, next) => {
	const admins = await adminDB.aggregate([
		{
			$project: {
				first_name: 1,
				last_name: 1,
				admin_country: 1,
				admin_city: 1,
				admin_type: 1,
				_id: 1,
			},
		},
		{
			$sort: { first_name: 1 },
		},
	]);

	if (!admins) {
		return next(new AppError('nothing matches', 204));
	}

	return res.status(200).json({
		status: 'success',
		results: admins.length,
		data: admins,
	});
});

exports.searchName = catchAsync(async (req, res, next) => {
	const { input } = req.body;
	const wordToInclude = new RegExp(input, 'ig');
	const admins = await adminDB.aggregate([
		{
			$match: {
				$or: [{ first_name: wordToInclude }, { last_name: wordToInclude }],
			},
		},
		{
			$project: {
				first_name: 1,
				last_name: 1,
				_id: 0,
			},
		},
		{
			$sort: {
				first_name: 1,
			},
		},
	]);

	if (admins.length === 0) {
		return res.status(204).json({
			status: 'success',
			message: 'nothing matches',
		});
	}

	res.status(200).json({
		status: 'success',
		data: admins,
	});
});

exports.searchAdmins = catchAsync(async (req, res, next) => {
	let newObj = filterObj(
		req.body,
		'admin_type',
		'admin_country',
		'admin_city',
		'first_name',
		'last_name'
	);

	if (Object.keys(newObj).length === 0) {
		return next(new AppError('please insert some criteria', 400));
	}

	const admins = await adminDB
		.find(newObj)
		.sort('createdAt')
		.select('-admin_country_ref -__v -updatedAt -_id');

	if (admins.length === 0) {
		return res.status(204).json({
			status: 'success',
			message: 'nothing matches',
		});
	}

	return res.status(200).json({
		status: 'success',
		results: admins.length,
		data: admins,
	});
});

exports.currentAdmin = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const admin = await adminDB
		.findOne({ _id: id })
		.select(['-_id', '-admin_country_ref', '-__v', '-updatedAt']);

	if (!admin) {
		return next(new AppError('no admin found', 404));
	}

	return res.status(200).json({
		status: 'success',
		data: admin,
	});
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
	// 1) update admin document
	const filteredFields = {
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		email: req.body.email,
		phone_number: req.body.phoneNumber,
		// profile_image: req.files.images[0].path,
	};

	const updatedAdmin = await adminDB.findByIdAndUpdate(
		// req.admin.id,
		req.body._id,
		filteredFields,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedAdmin) {
		return next(new AppError('Updated successfully ', 200));
	}
	res.status(200).json({
		status: 'success',
		message: 'updated successfully',
		data: updatedAdmin,
	});
});

exports.deleteAdmin = catchAsync(async (req, res, next) => {
	const admin = adminDB.findByIdAndDelete(req.params.id);

	if (!admin) {
		return next(new AppError('admin with that id not found!', 404));
	}

	return res.status(204).json({
		status: 'success',
		message: 'admin deleted successfully',
	});
});

exports.getLockEstates = catchAsync(async (req, res, next) => {
	const lockedEstates = await estateDB.find({ lock_position: true });

	if (!lockedEstates) {
		return next(new AppError('There is no locked estate!', 404));
	}

	return res.status(200).json({ status: 'success', data: lockedEstates });
});

exports.getSellPositionEstates = catchAsync(async (req, res, next) => {
	const estate = await estateDB.find({ sell_position: true });
	return res.status(200).json({ data: estate });
});
