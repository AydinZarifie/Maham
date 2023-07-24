const mongoose = require('mongoose');
// mongoose.set('debug', true);
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AppError = require('../utilities/error/appError');
const countryDB = require('./country');

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
		admin_country: {
			type: String,
		},
		admin_city: {
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

adminSchema.virtual('full_name').get(function () {
	return `${this.first_name} ${this.last_name}`;
});

adminSchema.pre('save', async function (next) {
	const country = await countryDB.findOne({
		country_name: this.admin_country,
	});

	if (!country) {
		return next(
			new AppError('country is not defined , please create country first', 400)
		);
	}

	this.admin_country_ref = country._id;
	next();
});

adminSchema.post('save', async function (doc, next) {
	const refCountry = await countryDB.findById(doc.admin_country_ref);
	if (!refCountry) {
		next(
			new AppError('country does not exist , please create country first ', 404)
		);
	}
	refCountry.country_admins.push(doc.id);
	refCountry.save();
});

adminSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

adminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() - 1000,
			10
		);
		return JWTTimestamp < changedTimestamp;
	}

	// false if not changed password
	return false;
};

adminSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	console.log({ resetToken }, this.passwordResetToken);

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('Admin', adminSchema);
