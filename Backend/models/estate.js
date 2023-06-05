const mongoose = require('mongoose');

// TODO : validation
// TODO : mongo middlewares

const estateRoomsSchema = new mongoose.Schema({
    //estate rooms schema
    total_building_metraj: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    floor_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    total_rooms_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    bedroom: {
        type: Boolean,
    },
    bedroom_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    bedroom_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    diningRoom: {
        type: Boolean,
    },
    diningRoom_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },

    diningRoom_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    guestRoom: {
        type: Boolean,
    },
    guestRoom_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    guestRoom_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    livingroom: {
        type: Boolean,
        set: (a) => (a === '' ? undefined : a),
    },
    livingroom_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    livingroom_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    bathroom: {
        type: Boolean,
    },
    bathroom_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    bathroom_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    balcony: {
        type: Boolean,
    },
    balcony_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    balcony_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    kitchen: {
        type: Boolean,
    },
    kitchen_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    kitchen_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    garage: {
        type: Boolean,
        set: (a) => (a === '' ? undefined : a),
    },
    garage_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    garage_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },

    frontYard: {
        type: Boolean,
        set: (a) => (a === '' ? undefined : a),
    },
    frontYard_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    workRoom: {
        type: Boolean,
    },
    workRoom_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    workRoom_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    conference_room: {
        type: Boolean,
    },
    conference_room_count: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
    conference_room_size: {
        type: Number,
        set: (a) => (a === '' ? undefined : a),
    },
});

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
    // new added 2023/05/26
    furniture: {
        type: Boolean,
    },
    parkingLot: {
        type: Boolean,
    },
    barbique: {
        type: Boolean,
    },
});

const estateSchema = new mongoose.Schema({
    stateId: {
        type: String,
    },
    country_name: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    city_name: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    estate_title: {
        type: String,
        required: [true, 'must have a title'],
        set: (a) => (a === '' ? undefined : a),
    },
    main_street: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    minor_street: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    building_number: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    floor_number: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    unit_number: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    postal_code: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    location: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    price: {
        type: Number,
        min: [0, 'price must me above 0'],
        set: (a) => (a === '' ? undefined : a),
    },
    ///
    state_description: {
        type: String,
        trim: true, // will delete white spaces before and after end of the string
        // required: [true, 'missing SUMMARY'],
        set: (a) => (a === '' ? undefined : a),
    },
    ///
    estate_type: {
        //Commercial , Residential & etc
        type: String,
        enum: {
            // this works only for strings
            values: ['Commercial', 'Residential'],
            message:
                'an estate type must be either "Commercial" or "Residential" ',
        },
        set: (a) => (a === '' ? undefined : a),
    },
    ///
    estate_view: {
        type: String,
        set: (a) => (a === '' ? undefined : a),
    },
    ///
    imageUrl: {
        type: Array,
        set: (a) => (a === '' ? undefined : a),
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // setting the value of select property to false , causes this field be not visible to users on output
        select: false,
    },
    estate_rooms: [estateRoomsSchema],
    estate_facilities: [estateFacilitiesSchema],
});

module.exports = mongoose.model('real-estates', estateSchema);