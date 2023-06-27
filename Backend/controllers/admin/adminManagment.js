const countryDB = require('../../models/country');
const catchAsync = require('./../../utilities/catchAsync');

// exports.postAddCountry = (req, res) => {
//     const country_name = req.body.countryName;
//     console.log(country_name);
//     return res.json({ message: 'Success' });
// };

//////////////////

exports.getAllCountries = catchAsync(async (req, res, next) => {
    console.log("get");
    const countries = await countryDB.find().select({country_name : 1})
    console.log(countries);
    res.status(200).json(countries);
    next();
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
	if (req.body.countryName) {
		const country = await countryDB.findOne({
			country_name: req.body.countryName,
		});
		if (!country) {
			return next(new AppError('country not found', 404));
		} else {
			await country.country_cities.push(req.body.cityName);
		}
		res.status(200).json({
			status: 'success',
			message: 'city was added succesfully',
		});
	} else {
		res.status(404).json({
			status: 'fail',
			message: 'please insert the country',
		});
	}
	return next();
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
			status: 'sucess',
			data: country.country_cities,
		});
	}
});
