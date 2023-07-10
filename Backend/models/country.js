const mongoose = require('mongoose');
const estateDB = require('./estate.js');

const country = new mongoose.Schema({
	country_name: {
		type: String,
	},
	country_cities: {
		type: Array,
		default: [],
	},
	country_logo: {
		type: String,
	},
	country_estates: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'real-estates',
		},
	],
});

module.exports = mongoose.model('Country', country);
