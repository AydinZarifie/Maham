const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema(
	{
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
				ref: 'Estate',
			},
		],
		country_admins: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Admin',
			},
		],
	},
	{
		toJson: { virtuals: true },
		toObject: { virtuals: true },
	}
);

countrySchema.virtual('totalCities').get(function () {
	return this.country_cities.length;
});

countrySchema.virtual('totalEstates').get(function () {
	return this.country_Estates.length;
});

// countrySchema.virtual('admins', {
// 	ref: 'Admin',
// 	foreignField: 'admin_country_ref',
// 	localField: '_id',
// });

// countrySchema.virtual('users', {
// 	ref: 'User',
// 	foreignField: 'user_country_ref',
// 	localField: '_id',
// });

module.exports = mongoose.model('Country', countrySchema);
