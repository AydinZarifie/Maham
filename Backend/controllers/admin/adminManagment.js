const countryDB = require('../../models/country');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/catchAsync');
const AppError = require('./../../utilities/appError');
const APIFeatures = require('./../../utilities/APIFeatures');
const {
	countryCityRef,
} = require('./../../utilities/refrences/cityCountryRef.js');
const fs = require('fs');
///////////////////////////////////////////////////

exports.beautify = (str) => {
	formattedstr = str.trim().toLowerCase().replace(/\s+/g, '_');
	return formattedstr;
};

assignCountryCode = (countryname) => {
	const formattedCountryName = exports.beautify(countryname);
	console.log(formattedCountryName);
	let countryCode;

	// Check if the country already exists
	if (countryCityRef[formattedCountryName]) {
		return; // Country already exists, do nothing
	}

	const countryCount = countryCityRef.totalCountries + 1;

	if (countryCount % 10 === countryCount) {
		countryCode = String(countryCount).padStart(2, '0');
	} else {
		countryCode = countryCount.toString();
	}

	const updatedCountryCityRef = {
		...countryCityRef,
		[formattedCountryName]: {
			countryRefCode: countryCode,
			totalCities: 0,
		},
		totalCountries: countryCount,
	};

	// Update the countryCityRef object in the file
	fs.writeFileSync(
		`D:/maham/Maham/backend/utilities/refrences/cityCountryRef.js`,
		`exports.countryCityRef = ${JSON.stringify(
			updatedCountryCityRef,
			null,
			2
		)};\n`,
		{ flag: 'w' },
		() => {
			console.log('country refCode added successfully');
		}
	);
};

assignCityCode = (countryName, cityName) => {
	const formattedCityName = exports.beautify(cityName);
	const formattedCountryName = exports.beautify(countryName);

	let cityCode;

	// Check if the city already exists
	if (countryCityRef[formattedCountryName][formattedCityName]) {
		return; // City already exists, do nothing
	}

	const cityCount = countryCityRef[formattedCountryName].totalCities + 1;

	if (cityCount % 10 === cityCount) {
		cityCode = String(cityCount).padStart(2, '0');
	} else {
		cityCode = cityCount.toString();
	}

	countryCityRef[formattedCountryName][formattedCityName] = cityCode;

	countryCityRef[formattedCountryName].totalCities = cityCount;

	// Update the countryCityRef object in the file
	const updatedContent = `exports.countryCityRef = ${JSON.stringify(
		countryCityRef,
		null,
		2
	)};\n`;

	fs.writeFileSync(
		`D:/maham/Maham/backend/utilities/refrences/cityCountryRef.js`,
		updatedContent
	);

	console.log('Successfully updated countryCityRef');
};

exports.getAllCountries = catchAsync(async (req, res, next) => {
	const countries = await countryDB.find();
	if (!countries) {
		return next(
			new AppError('there is no country , please create a country first', 404)
		);
	}
	return res.status(200).json({
		message: ' success',
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
		return res.status(200).json({
			status: 'success',
			data: country.country_cities,
		});
	}
});

exports.getAllEstates = catchAsync(async (req, res, next) => {
	// console.log(req.query);
	const features = new APIFeatures(estateDB.find(), req.query)
		.filter()
		.sort()
		.fieldLimit()
		.paging();
	const estates = await features.query;

	return res.status(200).json({
		status: 'success',
		data: estates,
	});
});

// age yebar country ro add konim , va dafe dige hamun country ro entexab konim ke shahri behesh ezafe konim , lazeme bazam country name vared konim ? age nakonim be megdar jadid (ke null hast) update mishe ya gabli mimune ?
exports.postAddCountry = catchAsync(async (req, res, next) => {
	countryName = exports.beautify(req.body.countryName);
	countryLogo = req.files.images[0].path;

	if (!req.body.countryName) {
		return next(new AppError('no country name provided', 400));
	}
	if (!req.files.images) {
		return next(new AppError('no country logo provided', 400));
	}
	const newCountry = new countryDB({
		country_name: countryName,
		country_logo: countryLogo,
	});

	await assignCountryCode(countryName);
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
			country.country_cities.push(exports.beautify(req.body.cityName));
			await assignCityCode(req.body.countryName, req.body.cityName);
			await country.save();
		}

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
	return res.status(200).json({
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
