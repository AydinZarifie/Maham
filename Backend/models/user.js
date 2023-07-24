const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('User', userSchema);
