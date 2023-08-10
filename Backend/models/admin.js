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

adminSchema.pre('save', function (next) {
	this.full_name = `${this.first_name}${this.last_name}`;
	next();
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

adminSchema.pre(
	'deleteOne',
	{ document: true, query: false },
	async function (next) {
		const deletedAdminId = this._id;

		// 1) find the country based on admin_country_ref
		const country = await countryDB.findById(this.admin_country_ref[0]);

		if (!country) {
			console.log('country does not exists!'); // return next(new AppError('country does not exists', 404));
		}

		// 2) find de index of deleted admin's id within country_admins array and delete it
		country.country_admins.splice(
			country.country_admins.indexOf(deletedAdminId),
			1
		);

		// 3) save the updated country
		await country.save();
		next();
	}
);

// refrencing the admin to its country
adminSchema.post('save', async function (doc, next) {
	const refCountry = await countryDB.findById(doc.admin_country_ref);
	if (!refCountry) {
		next(
			new AppError('country does not exist , please create country first ', 404)
		);
	}
	refCountry.country_admins.push(doc.id);
	await refCountry.save();
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
