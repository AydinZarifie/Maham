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

exports.generateMint = (country, modifiedCityName) => {
	// specify the containers of mint args
	const countryCode = country.country_code;
	let cityCode;
	let estateCode;

	// assign city code
	const cityIndex = country.country_cities.indexOf(modifiedCityName) + 1;
	cityCode = cityIndex.toString();

	// assining the estate Code
	// let availableMints = country.available_mints;
	const startsWith = countryCode + cityCode;

	const pattern = new RegExp(`^${startsWith}`, 'i');
	if (country.available_mints.length === 0) {
		estateNum = country.last_mints[countryCode + cityCode] + 1;
		console.log(estateNum);
		estateCode = estateNum.toString();
	} else {
		for (let i = 0; i < country.available_mints.length; i++) {
			if (pattern.test(country.available_mints[i])) {
				// If a match is found, print the element and stop searching
				estateCode = country.available_mints.splice(i, 1)[0];
				break;
			}
		}
	}

	// generating the mint
	return (mint = countryCode + cityCode + estateCode);
};

exports.filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) {
			newObj[el] = obj[el];
		}
	});
	return newObj;
};

// every field in requset object that its value is String >> changes to lowercase
// exports.toLowerCase = (req, res, next) => {
// 	for (let key in req.body) {
// 		if (typeof req.body[key] === 'string') {
// 			req.body[key] = req.body[key].toLowerCase();
// 		}
// 	}
// 	next();
// };
