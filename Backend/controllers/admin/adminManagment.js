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
			message: 'there is no country please create one first',
		});
	}

	return res.status(200).json({
		message: 'success',
		data: countries,
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
		data: country.cities,
	});
});

exports.postAddCountry = catchAsync(async (req, res, next) => {
	if (!req.body.countryName) {
		return next(new AppError('no country name provided', 400));
	}

	if (!req.files.images) {
		return next(new AppError('no country logo provided', 400));
	}

	countryName = formatStr(req.body.countryName);
	countryLogo = req.files.images[0].path;

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
		const country = await countryDB
			.findOne({
				country_name: req.body.countryName,
			})
			.select([
				'cities',
				'country_code',
				'country_name',
				'country_logo',
				'last_mints',
			]);

		// check if selected country actually exists in DB
		if (!country) {
			return next(new AppError('country not found', 404));
			// check if cityName is inserted
		} else if (!req.body.cityName) {
			return next(new AppError('plesae insert city', 400));
			// if all is ok , adds the city to cities collection of chosen country
		}
		const cityExist = country.cities.includes(formatStr(req.body.cityName));

		if (cityExist) {
			return res.status(400).json({
				message: 'City already exist',
			});
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

// estates of slected country & city
exports.getEstates = catchAsync(async (req, res, next) => {
	const estates = await estateDB
		.find({
			country_name: `${req.params.countryName}`,
			city_name: `${req.params.cityName}`,
		})
		.select([
			'country_name',
			'city_name',
			'landlord_address',
			'estate_title',
			'volume',
			'maham_price',
			'customer_price',
			'contract_address',
			'sell_position',
			'lock_position',
		])
		.sort('createdAt');

	console.log();
	if (!estates) {
		return res.status(400).json({
			message: 'country or city does not exist',
		});
	} else if (estates.length === 0) {
		return res.status(204).json({
			message: 'this city has no Estate yet.',
		});
	}

	return res.status(200).json({
		status: 'success',
		data: estates,
	});
});

exports.lockUnLockEstate = catchAsync(async (req, res, next) => {
	const estate = await estateDB
		.findById(req.params.id)
		.select(['_id', 'lock_position', 'sell_position']);

	if (!estate) {
		return next(new AppError('estate not found', 401));
	}

	// if estate was LOCKED >> UNLOCK
	estate.lock_position = !estate.lock_position;

	// set the sell_position to false
	estate.sell_position = false;

	await estate.save();

	let resMessage;
	if (estate.lock_position) {
		resMessage = 'locked';
	} else {
		resMessage = 'unLocked';
	}

	return res.status(200).json({
		message: `estate succesfully ${resMessage}`,
	});
});

exports.getCountriesInfo = catchAsync(async (req, res, next) => {
	if (req.roles !== 'superadmin') {
		return res.status(401).json({
			message: 'Just superadmin can access to this function',
		});
	}

	const countriesInfo = await countryDB.find();

	console.log(countriesInfo);

	return res.status(200).json({
		status: 'success',
		data: countriesInfo,
		// data: { countriesInfo, sumVolume, totalEstates },
	});
});
