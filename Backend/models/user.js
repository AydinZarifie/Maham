const mongoose = require('mongoose');

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
		assets: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'real_estates',
			},
		],
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
module.exports = mongoose.model('User', userSchema);
