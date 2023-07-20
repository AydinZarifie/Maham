const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
	country_code: {
		type: String,
	},
	country_name: {
		type: String,
	},
	cities: {
		type: Array,
		default: [],
	},
	country_logo: {
		type: String,
	},
	available_mints: {
		type: [],
		default: [],
	},
	last_mints: {
		type: Object,
		default: {},
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

countrySchema.virtual('totalCities').get(function () {
	return this.cities.length;
});

countrySchema.virtual('totalEstates').get(function () {
	return this.country_estates.length;
});

// country.pre('save', function () {
// 	if (!this.isNew) return next();
// 	totalCountries++;
// 	next();
// });

module.exports = mongoose.model('Country', countrySchema);