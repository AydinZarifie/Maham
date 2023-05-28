const mongoose = require('mongoose');
const estateRoomsSchema = require('./estate-rooms');
const estateFacilitiesSchema = require('./estate-facilities');

const estateSchema = new mongoose.Schema({
    stateId: {
        type: String,
    },
    country_name: {
        type: String,
    },
    city_name: {
        type: String,
    },
    estate_title: {
        type: String,
    },
    main_street: {
        type: String,
    },
    minor_street: {
        type: String,
    },
    building_number: {
        type: String,
    },
    floor_number: {
        type: String,
    },
    unit_number: {
        type: String,
    },
    postal_code: {
        type: String,
    },
    location: {
        type: String,
    },
    ///
    state_description: {
        type: String,
    },
    ///
    estate_type: {
        //Commercial , Residential & etc
        type: String,
    },
    ///
    estate_view: {
        type: String,
    },
    ///
    imageUrl: {
        type: Array,
    },
    introduction_video: {
        type: String,
    },
    estate_rooms: [estateRoomsSchema],
    //type: mongoose.Schema.Types.ObjectId,
    // ref: 'estate-rooms',

    estate_facilities: [estateFacilitiesSchema],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'estate-facilities',
});

module.exports = mongoose.model('real-estates', estateSchema);
