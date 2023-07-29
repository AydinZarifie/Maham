const mongoose = require('mongoose');
const countryDB = require('./country');

const userSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
		},
		last_name: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		birth_date: {
			type: String,
		},
		phone_number: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
		country: {
			type: String,
		},
		city: {
			type: String,
		},
		passport_id: {
			type: String,
		},
		passport_image: {
			type: [String],
		},
		user_country_ref: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Country',
				required: [true, 'user must belong to a country'],
			},
		],
	},
	{
		toJson: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Refrence user to belonging country
userSchema.pre('save', async function (next) {
	const country = await countryDB.findOne({
		country_name: this.country,
	});

	if (!country) {
		return next(
			new AppError('country is not defined , please create country first', 400)
		);
	}

	this.country_ref = country._id;
	next();
});

module.exports = mongoose.model('User', userSchema);
