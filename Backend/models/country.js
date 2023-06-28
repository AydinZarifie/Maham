const mongoose = require('mongoose');

const country = new mongoose.Schema({
	country_name: {
		type: String,
	},
	country_cities: {
		type: Array,
	},
	country_logo: {
		type: String,
	},
	// country_estates
});

module.exports = mongoose.model('Country', country);
