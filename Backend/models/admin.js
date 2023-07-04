const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const adminSchema = mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
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
			validate: [validator.isEmail, 'please provide a valid email'],
		},
		password: {
			type: String,
			required: [true, 'please provided a password'],
			// minLength: 8,
			select: false,
		},
		admin_type: {
			type: String,
			// required: true,
		},
		passwordChangedAt: {
			type: Date,
		},
		//store acitivity of admins
	},
	{ timestamps: true, strict: true }
);

adminSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

adminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < changedTimestamp;
	}

	// false if not changed password
	return false;
};
module.exports = mongoose.model('Admin', adminSchema);
