const mongoose = require('mongoose');

const estateFacilitiesSchema = new mongoose.Schema({
    WiFi: {
        type: Boolean,
    },
    elevator: {
        type: Boolean,
    },
    security_seystem: {
        type: Boolean,
    },
    swimming_Pool: {
        type: Boolean,
    },
    childcare_Center: {
        type: Boolean,
    },
    fitness_center: {
        type: Boolean,
    },
    loundry_facilities: {
        type: Boolean,
    },
});

module.exports = mongoose.model('estate-facilities', estateFacilitiesSchema);

// connect to main schema
