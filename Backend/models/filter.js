const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
	filterName: {
		type: String,
		required: true,
		unique: true,
	},
	filterImageUrl: {
		type: String,
		// required: true,
		// unique: true,
	},
});

module.exports = mongoose.model('Filter', filterSchema);
