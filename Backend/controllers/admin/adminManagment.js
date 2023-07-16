const countryDB = require("../../models/country");
const catchAsync = require("./../../utilities/catchAsync");
const estateDB = require("../../models/estate");
const AppError = require('./../../utilities/appError');

exports.getAllCountries = catchAsync(async (req, res) => {
  const countries = await countryDB.find();
  res.status(200).json({
    data: countries,
    message: "Successfully",
  });
});

// age yebar country ro add konim , va dafe dige hamun country ro entexab konim ke shahri behesh ezafe konim , lazeme bazam country name vared konim ? age nakonim be megdar jadid (ke null hast) update mishe ya gabli mimune ?
exports.postAddCountry = catchAsync(async (req, res) => {
  const inputs = {
    countryName: req.body.countryName,
    countryLogo: req.files.images[0].path,
  };
  if (!req.body.countryName) {
    return next(new AppError("no country name provided", 401));
  }
  if (!req.files.images) {
    return next(new AppError("no country logo provided", 402));
  }
  const newCountry = new countryDB({
    country_name: inputs.countryName,
    country_logo: inputs.countryLogo,
  });

  await newCountry.save();

  return res.status(201).json({
    status: "success",
  });
});

exports.addCity = catchAsync(async (req, res) => {

	const country_name = req.body.countryName;
	const city_name = req.body.cityName;

	if(country_name == 'null'){
		console.log(1);
		return res.status(401).json({
			message : "coutnry name was empty"
		})
	}
	if(city_name == 'null'){
		return res.status(402).json({
			message : "city name was empty"
		})
	}
  const country = await countryDB.findOne({
    country_name: req.body.countryName,
  });

  await country.cities.push(req.body.cityName);
  country.save();

  return res.status(200).json({
    status: "success",
    message: "city was added succesfully",
  });
});

/// get all cities of given country
exports.getAllCities = catchAsync(async (req, res) => {
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
