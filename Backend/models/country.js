const mongoose = require('mongoose');

const country = new mongoose.Schema({
	country_code: {
		type: String,
	},
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
	country_admins: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Admin',
		},
	],
});

module.exports = mongoose.model('Country', country);
