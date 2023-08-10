const userDB = require('../../models/user');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');

exports.getMyAssets = catchAsync(async (req, res, next) => {
	const user = await userDB.findOne({ id: req.body.id }).populate({
		path: 'assets',
		// which fields ?
		select: ['country_name', 'city_name', 'mint_id'],
	});

	console.log(user);

	if (!user || user.length === 0) {
		return next(new AppError('there is no user weith that ID', 204));
	}

	if (user.assets.length === 0) {
		return next(new AppError('user has no properties', 204));
	}

	return res.status(200).json({
		status: 'success',
		length: user.assets.length,
		data: user.assets,
	});
});

exports.searchEstateByTitle = catchAsync(async (req, res, next) => {
	//// 1) check that : (A) body is not empty ; (B) estateTitle field is not a blank field
	if (!req.body.estateTitle || /^\s*$/.test(req.body.estateTitle)) {
		return res.status(400).json({
			message: 'search criteria cannot be blank',
		});
	}

	//// 2) get the given input from body and convert it to a reqular expression
	const { estateTitle } = req.body;
	const wordToInclude = new RegExp(estateTitle, 'ig');

	//// 3) search for estates with given criteria
	const estates = await estateDB
		.find({ estate_title: wordToInclude })
		.select({
			estate_title: 1,
			country_name: 1,
			city_name: 1,
			maham_price: 1,
			_id: 0,
		})
		.sort('estate_title');

	if (estates.length === 0) {
		return res.status(204).json({
			status: 'success',
			message: 'nothing matches',
		});
	}

	res.status(200).json({
		status: 'success',
		results: estates.length,
		data: estates,
	});
});

exports.searchEstateByFilter = catchAsync(async (req, res, next) => {
	//// 1) check if the request body contains any data as filter criters
	if (Object.keys(req.body).length == 0) {
		return next(new AppError('please insert some criteria', 400));
	}

	//// 2)  modify the request object >>
	// (A): check for request object to only contain allowed fields
	// (B): change camelCase inputs into under_score_base
	const newObj = filterObj(req.body, ['countryName', 'cityName']);

	//// 3) check if estate_title exists >> if true include it in finalObj , if false assign finalObj as newObj
	let finalObj;
	if (req.body.estateTitle) {
		const wordToInclude = new RegExp(req.body.estateTitle, 'ig');
		finalObj = {
			estate_title: wordToInclude,
			...newObj,
		};
	} else {
		finalObj = newObj;
	}

	//// 4) check if the criterias for filter *except estate_title* is non-empty and non-null
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

	//// 5) find estate with given criterias
	const estates = await estateDB
		.find(finalObj)
		.select({
			city_name: 1,
			country_name: 1,
			estate_title: 1,
			_id: 0,
		})
		.sort('estate_title');

	//// 6) if nothing matches , send 204 code as response
	if (estates.length === 0) {
		return res.status(204).json({
			status: 'success',
			message: 'nothing matches',
		});
	}

	//// 7) send the response
	return res.status(200).json({
		status: 'success',
		results: estates.length,
		data: estates,
	});
});

exports.OnBuyEstate = catchAsync(async (req, res, next) => {
	const { estateId, userId, userWallet } = req.body;

	const newEstate = await estateDB.findOneAndUpdate(
		{ _id: estateId },
		{ $set: { landLord_address: userWallet } }, // to modify only that field
		{ new: true }
	);

	if (!newEstate) {
		return next(new AppError('Estate not found', 404));
	}

	const newUser = await userDB.findOneAndUpdate(
		{ _id: userId },
		{ $push: { assets: estateId } }, // to modify only that field
		{ new: true }
	);

	if (!newUser) {
		return next(new AppError('User not found', 404));
	}

	return res.status(200).json({
		status: 'success',
		message: "User's assets and estate's landLord address successfully updated",
	});
});
