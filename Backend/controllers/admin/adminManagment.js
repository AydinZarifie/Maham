const countryDB = require('../../models/country');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/catchAsync');
const AppError = require('./../../utilities/appError');
const APIFeatures = require('./../../utilities/APIFeatures');

exports.getAllCountries = catchAsync(async (req, res, next) => {
	//////////////  execute the query
	const features = new APIFeatures(countryDB.find(), req.query)
		.filter()
		.sort()
		.fieldLimit()
		.paging();
	const countries = await features.query;

	//////////////  send response
	res.status(200).json({
		status: 'success',
		data: {
			countries,
		},
	});
});

/// get all cities of given country
exports.getAllCities = catchAsync(async (req, res, next) => {
	const country = await countryDB.findOne({
		country_name: req.params.countryName,
	});
	if (!country) {
		return next(new AppError('country not found', 404));
	} else {
		res.status(200).json({
			status: 'success',
			data: country.country_cities,
		});
	}
});

// age yebar country ro add konim , va dafe dige hamun country ro entexab konim ke shahri behesh ezafe konim , lazeme bazam country name vared konim ? age nakonim be megdar jadid (ke null hast) update mishe ya gabli mimune ?
exports.postAddCountry = catchAsync(async (req, res, next) => {
	const inputs = {
		countryName: req.body.countryName,
		countryCities: req.body.cityName,
		countryLogo: req.files.images[0].path,
	};
	const newCountry = new countryDB({
		country_name: inputs.countryName,
		country_cities: inputs.countryCities,
		country_logo: inputs.countryLogo,
	});
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
		} else {
			await country.country_cities.push(req.body.cityName);
		}
		// send response
		return res.status(200).json({
			status: 'success',
			message: 'city was added succesfully',
		});

		// if country was not selected >> return with error
	} else {
		return next(new AppError('plesae insert country', 400));
	}
});

// exports.getEstatesOfCountry =

exports.getAllEstates = catchAsync(async (req, res, next) => {
	//////////////  execute the query
	const features = new APIFeatures(estateDB.find(), req.query)
		.filter()
		.sort()
		.fieldLimit()
		.paging();
	const estates = await features.query;

	//////////////  send response
	res.status(200).json({
		status: 'success',
		data: {
			estates,
		},
	});
});

exports.getTopGainers = catchAsync(async (req, res, next) => {
	req.query.limit = '10';
	req.query.sort = 'change';
	req.query.fields = 'estate_title,price,change'; // change : price changing in spesific time periods
	next();
});
/////////////////////
exports.getTopGainersEasy = catchAsync(async (req, res, next) => {
	const data1 = estateDB
		.find()
		.select(['estate_title', 'price'])
		.sort('price')
		.limit(10);
	if (!data1) {
		return next(new AppError('nothing matches', 404));
	}
	return res.status(200).json({
		status: 'success',
		data: {
			wanted: data1,
		},
	});
});

exports.getHighestVolume = catchAsync(async (req, res, next) => {
	req.query.limit = '10';
	req.query.sort = 'volume';
	req.query.fields = 'estate_title,volume,price';
	next();
});
///////////////////////
exports.getHighestVolumeEasy = catchAsync(async (req, res, next) => {
	const highestVolume = estateDB
		.find()
		.select(['estate_title', 'volume', 'price'])
		.sort('volume')
		.limit(10);
	return res.status(200).json({
		highestVolume,
	});
});

exports.getEstatesOfSelectedCountryCity = catchAsync(async (req, res, next) => {
	// req.query.limit = '5';
	req.query.filter = `country_name:${req.body.countryName},city_name:${req.body.cityName}`;
	req.query.sort = 'createdAt';
	req.query.fields = 'estate_title,price,volume,landlordAddr,change'; // and more fields that not exist yet
	next();
});
///////////////////
exports.getEstatesOfSelectedCountryCityEasy = catchAsync(
	async (req, res, next) => {
		const data2 = estateDB
			.find()
			.where(country_name)
			.equals(req.body.countryName)
			.where(city_name)
			.equals(req.body.cityName)
			.select(['estate_title', 'volume', 'landlordAddr', 'price', 'change'])
			.sort('createdAt')
			.limit(10);
		return res.status(200).json({
			status: 'success',
			data: {
				wanted: data2,
			},
		});
	}
);

exports.getCountriesInfo = catchAsync(async (req, res, next) => {
	const numOfEstates = 0;
	let sumVolume = 0;
	const countriesInfo = countryDB
		.find()
		.select(['country_logo', 'country_name'])
		.populate({
			path: 'country_estates',
			select: ['volume'],
		});
	if (!countriesInfo) {
		return next('no such a country found', 404);
	}

	// gonna implement error handling if country has 0 cities
	numOfEstates = countriesInfo.country_cities.length;
	countriesInfo.country_cities.forEach((el) => {
		return (sumVolume += el.volume);
	});

	return res.status(200).json({
		status: 'sucess',
		data: {
			countriesInfo: countriesInfo,
			sumVol: sumVolume,
			totalEstates: numOfEstates,
		},
	});
});
