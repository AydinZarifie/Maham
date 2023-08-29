const countryDB = require('./../../models/country');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');

exports.getCountries = catchAsync(async (req, res, next) => {
	const countries = await countryDB
		.find()
		.select(['country_name', 'country_logo']);

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
