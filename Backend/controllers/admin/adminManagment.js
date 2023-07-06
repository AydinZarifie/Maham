const countryDB = require('../../models/country');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/catchAsync');
const AppError = require('./../../utilities/appError');
const APIFeatures = require('./../../utilities/APIFeatures');

///////////////////////////////////////////////////

function assignCountryCode(countryname) {
	const formattedCountryName = countryname.toLowerCase().replace(/\s/g, '_');

	let countryCode;

	// Check if the country already exists
	if (countryRef[formattedCountryName]) {
		return; // Country already exists, do nothing
	}

	totalCountries++;

	if (totalCountries % 10 == totalCountries) {
		countryCode = String(totalCountries).padStart(2, '0');
	} else {
		countryCode = toString(totalCountries);
	}

	countryRef[formattedCountryName] = countryCode;
}

function assignCityCode(countryname, cityname) {
	const formattedCityName = cityname.toLowerCase().replace(/\s/g, '_');

	let cityCode;

	// Check if the city already exists
	if (cityRef[countryname[formattedCityName]]) {
		return next(); // city already exists, do nothing
	}

	totalCities++;

	if (totalCities % 10 == totalCities) {
		cityCode = String(totalCities).padStart(2, '0');
	} else {
		cityCode = toString(totalCities);
	}

	cityRef[formattedCityName] = cityCode;
}

exports.getAllCountries = catchAsync(async (req, res, next) => {
	//////////////  execute the query
	const features = new APIFeatures(countryDB.find(), req.query)
		.filter()
		.sort()
		.fieldLimit()
		.paging();
	const countries = await features.query;

	res.status(200).json({
		data: countries,
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
// params
exports.getAllEstates = catchAsync(async (req, res, next) => {
	// console.log(req.query);
	const features = new APIFeatures(estateDB.find(), req.query)
		.filter()
		.sort()
		.fieldLimit()
		.paging();
	const estates = await features.query;

	res.status(200).json({
		status: 'success',
		data: estates,
	});
});

// age yebar country ro add konim , va dafe dige hamun country ro entexab konim ke shahri behesh ezafe konim , lazeme bazam country name vared konim ? age nakonim be megdar jadid (ke null hast) update mishe ya gabli mimune ?
exports.postAddCountry = catchAsync(async (req, res, next) => {
	const inputs = {
		countryName: req.body.countryName,
		countryLogo: req.files.images[0].path,
	};
	if (!req.body.countryName) {
		return next(new AppError('no country name provided', 400));
	}
	if (!req.files.images) {
		return next(new AppError('no country logo provided', 400));
	}
	const newCountry = new countryDB({
		country_name: inputs.countryName,
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
			await country.save();
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
		return next(new AppError('nothing matches to TopGainers option', 404));
	}
	return res.status(200).json({
		status: 'success',
		data: data1,
	});
});

// worked properly
exports.getHighestVolume = catchAsync(async (req, res, next) => {
	req.query.limit = '10';
	req.query.sort = 'volume';
	req.query.fields = 'estate_title,volume,price';
	next();
});
///////////////////////
exports.getHighestVolumeEasy = catchAsync(async (req, res, next) => {
	const highestVolume = await estateDB
		.find()
		.select(['estate_title', 'volume', 'price'])
		.sort('volume')
		.limit(10);
	if (!highestVolume) {
		return next(
			new AppError('nothing matches to highestVolume options in estateDB', 404)
		);
	}
	return res.status(200).json({
		highestVolume,
	});
});

exports.getEstatesOfCC = catchAsync(async (req, res, next) => {
	// console.log(req.params);
	// req.query.limit = '5';
	req.query.filter = {
		country_name: `${req.params.countryName}`,
		city_name: `${req.params.cityName}`,
	};
	req.query.sort = 'createdAt';
	req.query.fields = 'estate_title,price,volume'; /*landlord_address,change*/ // and more fields that not exist yet
	next();
});
///////////////////
exports.getEstatesOfCCEasy = catchAsync(async (req, res, next) => {
	const data2 = await estateDB
		.find({
			country_name: `${req.params.countryName}`,
			city_name: `${req.params.cityName}`,
		})
		.select([
			'estate_title',
			'volume',
			'price' /*'landlord_address',*/ /*'change'*/,
		])
		.sort('createdAt')
		.limit(10);
	// console.log(estateDB.query);
	res.status(200).json({
		status: 'success',
		data: data2,
	});
});

exports.getCountriesInfo = catchAsync(async (req, res, next) => {
	let sumVolume = 0;
	let totalEstates = 0;
	const countriesInfo = await countryDB
		.find()
		.select(['country_logo', 'country_name', 'country_estates'])
		.populate({
			path: 'country_estates',
			select: ['volume'],
		});

	if (countriesInfo.length === 0) {
		return next('no such countries found', 404);
	}

	// // calculates sumVol and totalEstates of all  the data that exists in DB
	// countriesInfo.forEach((country) => {
	// 	sumVolume += country.country_estates.reduce((total, estate) => {
	// 		totalEstates++;
	// 		return total + estate.volume;
	// 	}, 0);
	// });

	const countriesData = countriesInfo.map((country) => {
		const sumVolume = country.country_estates.reduce((total, estate) => {
			return total + estate.volume;
		}, 0);

		const totalEstates = country.country_estates.length;

		return {
			country_logo: country.country_logo,
			country_name: country.country_name,
			sumVolume,
			totalEstates,
		};
	});

	return res.status(200).json({
		status: 'success',
		data: countriesData,
		// data: { countriesInfo, sumVolume, totalEstates },
	});
});
