const countryDB = require("../../models/country");
const catchAsync = require("../../utilities/Errors/catchAsync");
const estateDB = require("../../models/estate");
const AppError = require('../../utilities/Errors/appError');
const {formatStr,assignCode} = require('./../../utilities/Mint');

exports.getAllCountries = catchAsync(async (req, res) => {
  const countries = await countryDB.find();
  res.status(200).json({
    data: countries,
    message: "Successfully",
  });
});

// age yebar country ro add konim , va dafe dige hamun country ro entexab konim ke shahri behesh ezafe konim , lazeme bazam country name vared konim ? age nakonim be megdar jadid (ke null hast) update mishe ya gabli mimune ?
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
		console.log(totalCountries);

		totalCountries++;

		if (totalCountries < 10) {
			countryCode = String(totalCountries).padStart(2, '0');
		} else {
			countryCode = totalCountries.toString();
		}
	} catch (err) {
		console.error(err);
		return next(new AppError('error on assigning countryCode', 400));
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
		const assignedCode = assignCode(2, cityCount);
		const propertyKey = country.country_code + assignedCode;

		let obj;
		if (!country.last_mints[propertyKey]) {
			obj = {
				...country.last_mints,
				[propertyKey]: 10000,
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

/// get all cities of given country
exports.getAllCities = catchAsync(async (req, res,next) => {
  const country = await countryDB.findOne({
    country_name: req.params.countryName,
  });
  if (!country) {
    return next(new AppError("country not found", 404));
  } else {
    console.log(country.cities);
    return res.status(200).json({
      data: country.cities,
      message: "Successfully",
    });
  }
});

exports.getEstates = catchAsync(async (req, res) => {
  const countryName = req.params.countryName;
  const cityName = req.params.cityName;

  const estates = await estateDB
    .find({ country_name: countryName, city_name: cityName })
    .select({});

  return res.status(202).json({
    data: estates,
    message: "Successfully",
  });
});

//No testing
