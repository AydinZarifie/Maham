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

exports.formatStr = (str) => {
	formattedstr = str.trim().toLowerCase().replace(/\s+/g, ' ');
	// "  UniTed stateS   of AmerICA "   >>   "united states of america"
	return formattedstr;
};

// changes the case of the words from camelCase to under_score_saperated
exports.changeCase = (camelCaseStr) => {
	let underScoreCaseStr = camelCaseStr.replace(
		/[A-Z]/g,
		(str) => '_' + str.toLowerCase()
	);
	return underScoreCaseStr;
};

// takes an object as input , and creates a new object by filtering the unwanted fields
exports.filterObj = (obj, allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) {
			newObj[exports.changeCase(el)] = obj[el];
		}
	});
	return newObj;
};
