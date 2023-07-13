const countryDB = require('../../models/country');
const catchAsync = require('./../../utilities/catchAsync');
const estateDB = require("../../models/estate");
const filter = require('../../models/filter');



exports.getAllCountries = catchAsync(async (req, res) => {

	console.log("req.session.verificationCode");
    const countries = await countryDB.find()
	console.log(countries);		
    res.status(200).json({
			data:countries,
			message : "Successfully"
	});
	
})

// age yebar country ro add konim , va dafe dige hamun country ro entexab konim ke shahri behesh ezafe konim , lazeme bazam country name vared konim ? age nakonim be megdar jadid (ke null hast) update mishe ya gabli mimune ?
exports.postAddCountry = catchAsync(async (req, res) => {
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

exports.addCity = catchAsync(async (req, res) => {
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
exports.getAllCities = catchAsync(async (req, res) => {

	const country = await countryDB.findOne({
		country_name: req.params.countryName,
	});
	if (!country) {
		return next(new AppError('country not found', 404));
	} else {
		console.log(country.cities);
		return res.status(200).json({
			data:country.cities,		
			message : "Successfully"
		});
	}
});

exports.getEstates = catchAsync(async(req,res) => {
	
	const countryName = req.params.countryName;
	const cityName = req.params.cityName;

	
	const estates = await estateDB.find({country_name : countryName , city_name : cityName}).select({
		
	});
	
	return res.status(202).json({
		data : estates,
		message : "Successfully"
	})


})

//No testing
