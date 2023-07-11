const mongoose = require('mongoose');
const estateDB = require('./estate.js');

const country = new mongoose.Schema({
	country_name: {
		type: String,
		unique : true,
	},
	cities: {
		type: Array,
	},
	country_logo: {
		type: String,
	},
	country_estates: [],
});

module.exports = mongoose.model('Country', country);
