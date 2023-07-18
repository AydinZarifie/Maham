const countryDB = require('../models/country');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');

exports.formatStr = (str) => {
	formattedstr = str.trim().toLowerCase().replace(/\s+/g, ' ');
	return formattedstr;
};

exports.assignCode = (len, num) => {
	if (len > num.toString.length) {
		newNum = String(num).padStart(len, '0');
	} else {
		newNum = num.toString();
	}
	return newNum;
};

exports.generateMint = catchAsync(async (req, res, next) => {
	// specify the length of the mint
	const modifiedCountryName = exports.formatStr(req.body.countryName);
	const modifiedCityName = exports.formatStr(req.body.cityName);
	/////////////////////////////////////////
	const country = await countryDB
		.findOne({ country_name: modifiedCountryName })
		.select([
			'country_code',
			'country_name',
			'country_cities',
			'country_estates',
			'last_mints',
			'available_mints',
		]);

	if (!country) {
		return next(new AppError('country does not exists!', 404));
	}
	///////////////////////////////////
	// specify the containers of mint args
	const countryCode = country.country_code;
	let cityCode;
	let estateCode;
	// assign city code
	const cityIndex = country.country_cities.indexOf(modifiedCityName) + 1;
	if (cityIndex < 10) {
		cityCode = String(cityIndex).padStart(2, '0');
	} else {
		cityCode = cityIndex.toString();
	}
	// assining the estate Code
	// let availableMints = country.available_mints;
	const startsWith = countryCode + cityCode;

	const pattern = new RegExp(`^${startsWith}`, 'i');
	if (country.available_mints.length === 0) {
		estateNum = country.last_mints[countryCode + cityCode] + 1;
		estateCode = String(estateNum).slice(1, 5);
	} else {
		for (let i = 0; i < country.available_mints.length; i++) {
			if (pattern.test(country.available_mints[i])) {
				// If a match is found, print the element and stop searching
				estateCode = country.available_mints.splice(i, 1)[0];
				break;
			}
		}
	}

	// update the last_mints object on database
	const obj = {
		...country.last_mints,
		[startsWith]: estateNum,
	};
	country.last_mints = obj;

	console.log(`estateCode is : ${estateCode}`);

	// save the modified country to database
	await country.save();

	// generating the mint
	const mint = countryCode + cityCode + estateCode;

	// send respose
	return res.status(200).json({
		status: 'success',
		message: 'mint created succesfully ',
		data: mint,
	});
});

// every field in requset object that its value is String >> changes to lowercase
// exports.toLowerCase = (req, res, next) => {
// 	for (let key in req.body) {
// 		if (typeof req.body[key] === 'string') {
// 			req.body[key] = req.body[key].toLowerCase();
// 		}
// 	}
// 	next();
// };
