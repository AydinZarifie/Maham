const mongoose = require('mongoose');

const estateRoomsSchema = new mongoose.Schema({
    //estate rooms schema
    total_building_metraj: {
        type: Number,
    },
    floor_count: {
        type: Number,
    },
    total_rooms_count: {
        type: Number,
    },
    bedroom: {
        type: Boolean,
    },
    bedroom_count: {
        type: Number,
    },
    bedroom_size: {
        type: Number,
    },
    diningRoom: {
        type: Boolean,
    },
    diningRoom_count: {
        type: Number,
    },
    diningRoom_size: {
        type: Number,
    },
    guestRoom: {
        type: Boolean,
    },
    guestRoom_count: {
        type: Number,
    },
    guestRoom_size: {
        type: Number,
    },
    livingroom_size: {
        type: Number,
    },
    bathroom: {
        type: Boolean,
    },
    bathroom_count: {
        type: Number,
    },
    bathroom_size: {
        type: Number,
    },
    balcony: {
        type: Boolean,
    },
    balcony_count: {
        type: Number,
    },
    balcony_size: {
        type: Number,
    },
    kitchen: {
        type: Boolean,
    },
    kitchen_count: {
        type: Number,
    },
    kitchen_size: {
        type: Number,
    },
    garage: {
        type: Boolean,
    },
    garage_size: {
        type: Number,
    },
    backYard: {
        type: Boolean,
    },
    backYard_size: {
        type: Number,
    },
    frontYard: {
        type: Boolean,
    },
    frontYard_size: {
        type: Number,
    },
    workRoom: {
        type: Boolean,
    },
    workRoom_count: {
        type: Number,
    },
    workRoom_size: {
        type: Number,
    },
    conference_room: {
        type: Boolean,
    },
    conference_room_count: {
        type: Number,
    },
    conference_room_size: {
        type: Number,
    },
});

module.exports = mongoose.model('estate-rooms', estateRoomsSchema);

// connect to main schema
