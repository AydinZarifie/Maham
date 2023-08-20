const adminDB = require('../../models/admin');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');
const { formatStr } = require('../../utilities/mint');
const bcrypt = require('bcryptjs');

exports.getAllAdmins = catchAsync(async (req, res, next) => {
	const admins = await adminDB.find();

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
	const first_name = req.body.name.split(' ')[0];
	const last_name = req.body.name.split(' ')[1];

	const admin = await adminDB.findOne({
		first_name: first_name,
		last_name: last_name,
	});

	if (!admin) {
		return next(new AppError('Admin not found!', 404));
	}

	return res.status(200).json({
		status: 'success',
		data: admin,
	});
});

exports.searchAdminByName = catchAsync(async (req, res, next) => {
	//// 1) check that : (A) body is not empty ; (B) adminName field is not a blank field
	if (!req.body.name || /^\s*$/.test(req.body.name)) {
		return res.status(400).json({
			message: 'search criteria cannot be blank',
		});
	}

	//// 2) get the given input from body and convert it to a reqular expression
	const { name } = req.body;
	const wordToInclude = new RegExp(name, 'ig');

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

	return res.status(200).json({
		status: 'success',
		results: admins.length,
		data: admins,
	});
});

exports.searchAdminByFilter = catchAsync(async (req, res, next) => {
	let query = {};

	if (req.body.adminType) {
		query.admin_type = formatStr(req.body.adminType);
	}
	if (req.body.countryName) {
		query.country_name = formatStr(req.body.countryName);
	}
	if (req.body.cityName) {
		query.city_name = formatStr(req.body.cityName);
	}

	const admins = await adminDB.find(query);

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

exports.getEditAdmin = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	console.log(id);
	const admin = await adminDB.findOne({ _id: id });

	if (!admin) {
		return next(new AppError('no admin found', 404));
	}

	return res.status(200).json({
		status: 'success',
		data: admin,
	});
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
	let filteredFields = {
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		email: req.body.email,
		phone_number: req.body.phoneNumber,
		country_name: req.body.country,
		city_name: req.body.city,
		admin_type: req.body.adminType,
	};

	if (req.body.confirmPassword && req.body.password) {
		const newPassword = req.body.password;

		const confirmNewPassword = req.body.confirmPassword;

		// check if new password and its confirmation is equal
		if (newPassword !== confirmNewPassword) {
			return next(
				new AppError('password and password confirmation does not match', 401)
			);
		}
		// hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 12);

		filteredFields = {
			...filteredFields,
			password: hashedPassword,
		};
	}

	const updatedAdmin = await adminDB.findByIdAndUpdate(
		req.params.id,
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
	const estates = await estateDB.find({ sell_position: true });

	if (!estates || estates.length === 0) {
		return res
			.status(404)
			.json({ message: 'there is no in-sell-position Estate' });
	}

	return res.status(200).json({ data: estates });
});
