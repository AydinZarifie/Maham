const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    country_name: {
        type: String,
    },
    country_cities: {
        type: Array,
    },
    country_logo: {
        type: String,
    },
});

module.exports = mongoose.model('Country', countrySchema);
