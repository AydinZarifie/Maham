const adminDB = require('../../models/admin');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');
const { filterObj } = require('./../../utilities/specialFunctions');
const { isEmail } = require('validator');

exports.getAllAdmins = catchAsync(async (req, res, next) => {
	const admins = await adminDB.find().select({
		first_name: 1,
		last_name: 1,
		full_name: 1,
		email: 1,
		admin_country: 1,
		admin_city: 1,
		admin_type: 1,
		_id: 1,
	});

	if (admins.length == 0) {
		return next(new AppError('nothing matches', 204));
	}

	return res.status(200).json({
		status: 'success',
		results: admins.length,
		data: admins,
	});
});

exports.getAdmin = catchAsync(async (req, res, next) => {
	const admin = await adminDB
		.findOne({ full_name: req.body.adminName })
		.select('-__v -createdAt -updatedAt -admin_country_ref -_id');

	if (!admin) {
		return next(new AppError('Admin not found!', 404));
	}

	return res.status(200).json({
		status: 'success',
		data: admin,
	});
});

exports.searchName = catchAsync(async (req, res, next) => {
	//// 1) check if : (A) body is not empty ; (B) adminName field is not a blank field
	if (!req.body.adminName || /^\s*$/.test(req.body.adminName)) {
		return res.status(400).json({
			message: 'search criteria cannot be blank',
		});
	}

	//// 2) get the given input from body and convert it to a reqular expression
	const { adminName } = req.body;
	const wordToInclude = new RegExp(adminName, 'ig');

	//// 3) search for admins with given criteria
	const admins = await adminDB
		.find({
			$or: [
				{ first_name: wordToInclude },
				{ last_name: wordToInclude },
				{ full_name: wordToInclude },
			],
		})
		.select({
			first_name: 1,
			last_name: 1,
			full_name: 1,
			_id: 0,
		})
		.sort('first_name');

	if (admins.length === 0) {
		return res.status(204).json({
			status: 'success',
			message: 'nothing matches',
		});
	}

	res.status(200).json({
		status: 'success',
		results: admins.length,
		data: admins,
	});
});

exports.searchAdmins = catchAsync(async (req, res, next) => {
	//// 1) check if the request body contains any data as filter criters
	if (Object.keys(req.body).length == 0) {
		return next(new AppError('please insert some criteria', 400));
	}

	//// 2)  modify the request object >>
	// (A): check for request object to only contain allowed fields
	// (B): change camelCase inputs into under_score_base
	const newObj = filterObj(req.body, [
		'adminType',
		'adminCountry',
		'adminCity',
	]);

	//// 3) check if adminName exists >> if true include it in finalObj , if false assign finalObj as newObnj
	let finalObj;
	if (req.body.adminName) {
		const wordToInclude = new RegExp(req.body.adminName, 'ig');
		finalObj = {
			$or: [
				{ first_name: wordToInclude },
				{ last_name: wordToInclude },
				{ full_name: wordToInclude },
			],
			...newObj,
		};
	} else {
		finalObj = newObj;
	}

	//// 4) check if the criterias for filter *except adminName* is non-empty and non-null
	if (
		Object.keys(finalObj).length == 0 || // check non-null
		Object.values(finalObj).some((item) => /^\s*$/.test(item)) // check non-empty >> "" , " " , "  " , ...
	) {
		return next(
			new AppError(
				'key fields spellings are not correct or invalid inputs',
				400
			)
		);
	}

	//// 5) find admin with given criterias
	const admins = await adminDB
		.find(finalObj)
		.select({
			first_name: 1,
			last_name: 1,
			admin_city: 1,
			admin_country: 1,
			admin_type: 1,
			_id: 0,
		})
		.sort('first_name');

	//// 6) if nothing matches , send 204 code as response
	if (admins.length === 0) {
		return res.status(204).json({
			status: 'success',
			message: 'nothing matches',
		});
	}

	//// 7) send the response
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
	// if (!isEmail(req.body.email)) {
	// 	return next(new AppError('wrong email format', 401));
	// }

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
		return next(new AppError('There is No such an admin with that id', 200));
	}

	res.status(200).json({
		status: 'success',
		message: 'updated successfully',
		data: updatedAdmin,
	});
});

exports.deleteAdmin = catchAsync(async (req, res, next) => {
	const admin = await adminDB.findById(req.params.id);
	console.log('entered into delete function');

	if (!admin) {
		return next(new AppError('There is No such an admin with that id', 404));
	}

	await admin.deleteOne();

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
