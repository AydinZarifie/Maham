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
    
    console.log(modifiedCityName);
    console.log(country);
	const cityIndex = country.cities.indexOf(modifiedCityName) + 1;
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
    console.log(countryCode , cityCode , estateCode);
	// generating the mint
	return (mint = countryCode + cityCode + estateCode);
};