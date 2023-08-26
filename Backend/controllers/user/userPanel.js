const userDB = require('../../models/user');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');

exports.getCountries = catchAsync(async (req, res, next) => {
	const countries = await countryDB
		.find()
		.select(['country_name', 'country_logo']);

	if (!user || countries.length === 0) {
		return next(new AppError('there is no country', 204));
	}

	return res.status(200).json({
		status: 'success',
		data: countries,
	});
});

exports.getCities = catchAsync(async (req, res, next) => {
	const countryName = req.params.countryName;

	const countries = await countryDB
		.find()
		.select(['country_name', 'country_logo']);

	if (!countryName || /^\s*$/.test(countryName)) {
		return res.status(401).json({
			message: 'there is no country',
		});
	}

	const cities = countryDB
		.findOne({ country_name: countryName })
		.select('cities');

	if (!cities || cities.length === 0) {
		return res.status(401).json({
			message: 'this country has no city yet',
		});
	}

	return res.status(200).json({
		status: 'success',
		data: cities,
	});
});

exports.getMyAssets = catchAsync(async (req, res, next) => {
	const user = await userDB.findOne({ id: req.body.id }).populate({
		path: 'assets',
		// which fields ?
		select: [
			'country_name',
			'city_name',
			'mint_id',
			'estate_title',
			'customer_price',
		],
	});

	console.log(user);

	if (!user) {
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
	//// 1) check that :
	// (A) body is not empty >> contains the estateTitle field
	// (B) estateTitle field is not a blank field >> "" or " " or "  " & ...
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
			// maham_price: 1,
			_id: 1,
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

exports.onBuyEstate = catchAsync(async (req, res, next) => {
	const { estateId, sellerId, buyerId, buyerWallet } = req.body;

	// 1) delete the estateId from sellers assets
	const updatedSeller = await userDB.findOneAndUpdate(
		{ _id: sellerId },
		{ $pull: { assets: estateId } }, // to modify only that field
		{ new: true }
	);

	if (!updatedSeller) {
		return next(new AppError('Seller not found', 404));
	}

	// 2) find the estate that is being sold , update its landlord field >> buyer is new ladnlord
	const newEstate = await estateDB.findOneAndUpdate(
		{ _id: estateId },
		{ $set: { landLord_address: buyerWallet } }, // to modify only that field
		{ new: true }
	);

	if (!newEstate) {
		return next(new AppError('Estate not found', 404));
	}

	// 3) add the estateId to buyer's assets
	const updatedBuyer = await userDB.findOneAndUpdate(
		{ _id: buyerId },
		{ $push: { assets: estateId } }, // to modify only that field
		{ new: true }
	);

	if (!updatedBuyer) {
		return next(new AppError('Buyer not found', 404));
	}

	return res.status(200).json({
		status: 'success',
		message: "User's assets and estate's landLord address successfully updated",
	});
});

exports.getEstateSellInfo = catchAsync(async (req, res, next) => {
	const estate = await estateDB
		.findOne({ _id: req.body.estateId })
		.select([
			'country_name',
			'city_name',
			'mint_id',
			'sell_price',
			'estate_title',
		]);

	if (!estate) {
		return next(new AppError('there is no such a country', 400));
	}

	return res.status(200).json({
		message: 'success',
		data: estate,
	});
});

exports.onSellPosition = catchAsync(async (req, res, next) => {
	// 1) get information that is gonna change, from request's body
	const filteredFields = {
		sell_position: true,
		lock_position: false,
		customer_price: req.body.price,
		// volume: volume + 1,
	};

	// 2) update Estate document
	const updatedEstate = await estateDB.findByIdAndUpdate(
		req.body.estateId,
		filteredFields,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedEstate) {
		return next(new AppError('Estate with that ID does not exist', 404));
	}

	return res.status(200).json({
		message: 'Successfully updated',
	});
});

exports.cancelSellPosition = catchAsync(async (req, res, next) => {
	// 1) get information that is gonna change, from request's body
	const filteredFields = {
		sell_position: false,
		lock_position: false,
	};

	// 2) update Estate document
	const updatedEstate = await estateDB.findByIdAndUpdate(
		req.body.estateId,
		filteredFields,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedEstate) {
		return next(new AppError('Estate with that ID does not exist', 404));
	}

	return res.status(200).json({
		message: 'Successfully canceled SELL position',
	});
});
