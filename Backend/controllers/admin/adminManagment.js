const countryDB = require('../../models/country');
const catchAsync = require('./../../utilities/catchAsync');
const estateDB = require('../../models/estate');
const AppError = require('./../../utilities/appError');
const {
	countryCityRef,
} = require('./../../utilities/refrences/cityCountryRef.js');
const fs = require('fs');

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
	console.log('req.session.verificationCode');
	const countries = await countryDB.find();
	console.log(countries);
	res.status(200).json({
		data: countries,
		message: 'Successfully',
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
	console.log(req.body.cityName);
	if (req.body.countryName) {
		const country = await countryDB.findOne({
			country_name: req.body.countryName,
		});
		if (!country) {
			return next(new AppError('country not found', 404));
		} else {
			await country.cities.push(req.body.cityName);
			country.save();
		}
		return res.status(200).json({
			status: 'success',
			message: 'city was added succesfully',
		});
	} else {
		return res.status(404).json({
			status: 'fail',
			message: 'please insert the country',
		});
	}
});

/// get all cities of given country
exports.getAllCities = catchAsync(async (req, res, next) => {
	const country = await countryDB.findOne({
		country_name: req.params.countryName,
	});
	if (!country) {
		return next(new AppError('country not found', 404));
	} else {
		console.log(country.cities);
		return res.status(200).json({
			data: country.cities,
			message: 'Successfully',
		});
	}
});

exports.getEstates = async (req, res) => {
	const countryName = req.params.countryName;
	const cityName = req.params.cityName;

	const estates = await estateDB
		.find({ country_name: countryName, city_name: cityName })
		.select({});

	return res.status(202).json({
		data: estates,
		message: 'Successfully',
	});
};
