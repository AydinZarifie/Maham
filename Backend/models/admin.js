const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
	{
		admin_type: {
			type: String,
			// required: true,
		},
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		full_name: {
			type: String,
		},
		phone_number: {
			type: String,
			// required: true,
			// unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true, // converts all characters to lowercase
		},
		profile_image: {
			type: String,
		},
		wallet: {
			type: [String],
			default: [],
		},
		country_name: {
			type: String,
		},
		city_name: {
			type: String,
		},
		admin_country_ref: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Country',
				required: [true, 'admin must belong to a country'],
			},
		],
		password: {
			type: String,
			required: [true, 'please provided a password'],
			// minLength: 8,
			select: false,
		},
		passwordChangedAt: {
			type: Date,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			selsect: false,
		},
		//store acitivity of admins
	},
	{
		timestamps: true,
		strict: true,
		toJson: { virtuals: true },
		toObject: { virtuals: true },
	}
);
module.exports = mongoose.model('Admin', adminSchema);
