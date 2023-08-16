const countryDB = require('../../models/country');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');
// const APIFeatures = require('./../../utilities/APIFeatures');
const { formatStr } = require('./../../utilities/mint');
///////////////////////////////////////////////////

exports.getAllCountries = catchAsync(async (req, res, next) => {
	const countries = await countryDB.find();
	if (countries.length === 0) {
		return res.status(204).json({
			status: 'success',
			message: 'there is no countries please create one first',
		});
	}

	return res.status(200).json({
		message: 'success',
		data: countries
	});
});
/// get all cities of given country
exports.getAllCities = catchAsync(async (req, res, next) => {
	if (!req.params.countryName) {
		return next(new AppError('please select a country ', 404));
	}

	const country = await countryDB
		.findOne({
			country_name: req.params.countryName,
		})
		.select('cities');

	if (!country) {
		return next(new AppError('Country does not exist', 404));
	}

	if (country.cities.length === 0) {
		return res.status(204).json({
			status: 'success',
			message: 'the country has no city defined',
		});
	}

	return res.status(200).json({
		status: 'success',
		data: country.cities
	});
});

exports.getAllEstates = catchAsync(async (req, res, next) => {
	const estates = await estateDB.find().select('-__V');

	console.log(estates);

	if (estates.length === 0) {
		return res.status(204).json({
			message: ' no estate exists in the DB',
		});
	}

	return res.status(200).json({
		status: 'success',
		data: estates,

	});
});

exports.postAddCountry = catchAsync(async (req, res, next) => {
	countryName = formatStr(req.body.countryName);
	countryLogo = req.files.images[0].path;

	if (!req.body.countryName) {
		return next(new AppError('no country name provided', 400));
	}
	if (!req.files.images) {
		return next(new AppError('no country logo provided', 400));
	}

	let countryCode;
	try {
		let totalCountries = await countryDB.countDocuments({}, { hint: '_id_' });
		totalCountries++;
		countryCode = totalCountries.toString();
	} catch (err) {
		console.error(err);
		return next(new AppError('error aquired on assigning countryCode', 400));
	}

	const newCountry = new countryDB({
		country_name: countryName,
		country_logo: countryLogo,
		country_code: countryCode,
	});

	// await assignCountryCode(countryName);
	await newCountry.save();

	return res.status(201).json({
		status: 'success',
	});
});

exports.addCity = catchAsync(async (req, res, next) => {
	// check if country selected
	if (req.body.countryName) {
		const country = await countryDB.findOne({
			country_name: req.body.countryName,
		});

		// check if selected country actually exists in DB
		if (!country) {
			return next(new AppError('country not found', 404));

			// check if cityName is inserted
		} else if (!req.body.cityName) {
			return next(new AppError('plesae insert city', 400));

			// if all is ok , adds the city to cities collection of chosen country
		}

		country.cities.push(formatStr(req.body.cityName));

		// Set the 'last_mints' property
		const cityCount = country.cities.length;
		const assignedCode = cityCount.toString();
		const propertyKey = country.country_code + assignedCode;

		let obj;
		if (!country.last_mints[propertyKey]) {
			obj = {
				...country.last_mints,
				[propertyKey]: 0,
			};
		}

		country.last_mints = obj;
		console.log(country.last_mints);

		await country.save();

		// send response
		return res.status(200).json({
			status: 'success',
			message: 'city was added succesfully',
		});

		// if country was not selected >> return with error
	} else {
		return next(new AppError('no country selected', 400));
	}
});

exports.getEstates = catchAsync(async (req, res, next) => {
	
	const estates = await estateDB
		.find({
			country_name: `${req.params.countryName}`,
			city_name: `${req.params.cityName}`,
		})
		.sort('createdAt');

	console.log(estates);
	return res.status(200).json({
		status: 'success',
		data: estates
	});
});

exports.lockEstate = catchAsync(async (req, res, next) => {
	// 1) get information that is gonna change, from request's body
	const filteredFields = {
		lock_position: true,
	};

	// 2) update Estate document
	const updatedEstate = await estateDB.findByIdAndUpdate(
		req.body.estateId,
		{filteredFields},
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedEstate) {
		return next(new AppError('Estate with that ID does not exist', 404));
	}

	return res.status(200).json({
		message: 'Successfully Locked',
	});
});

exports.cancelLockPosition = catchAsync(async (req, res, next) => {
	// 1) get information that is gonna change, from request's body
	const filteredFields = {
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
		message: 'Successfully canceled LOCK position',
	});
});