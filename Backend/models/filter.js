const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
	filter_name: {
		type: String,
		// required: true,
		// unique: true,
	},
	filter_imageUrl: {
		type: String,
		// required: true,
		// unique: true,
	},
});

module.exports = mongoose.model('Filter', filterSchema);
