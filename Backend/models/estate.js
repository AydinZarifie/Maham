const mongoose = require('mongoose');
const countryDB = require('./country');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const { ObjectId } = require('mongoose');

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

	garden: {
		type: Boolean,
		set: (a) => (a === '' ? undefined : a),
	},
	garden_count: {
		type: Number,
		set: (a) => (a === '' ? undefined : a),
	},
	garden_size: {
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
	garden: {
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
	estateId: {
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
		set: (a) => (a === '' ? undefined : a),
	},
	volume: {
		type: Number,
		default: 0,
		set: (a) => (a === '' ? undefined : a),
	},
	///
	state_description: {
		type: String,
		set: (a) => (a === '' ? undefined : a),
	},
	///
	estate_type: {
		//Commercial , Residential & etc
		type: String,
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
		//set: (a) => (a === '' ? undefined : a),
	},
	introduction_video: {
		type: Array,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		// setting the value of select property to false , causes this field be not visible to users on output
		select: false,
		set: (a) => (a === '' ? undefined : a),
	},
	landlordAddr: {
		type: String,
		set: (a) => (a === '' ? undefined : a),
	},
	//
	estate_rooms: [estateRoomsSchema],
	estate_facilities: [estateFacilitiesSchema],
	estate_country: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Country',
			// required: [true, 'estate must have belong to a country'],
		},
	],
});

// estateSchema.pre(
// 	'save',
// 	catchAsync(async function (next) {
// 		console.log('1');
// 		const country = await countryDB.findOne({
// 			country_name: `${this.country_name}`,
// 		});

// 		if (!country) {
// 			return next(
// 				new AppError(
// 					'country is not defined , please create country first',
// 					404
// 				)
// 			);
// 		}

// 		this.estate_country = country._id;
// 		next();
// 	})
// );

// estateSchema.post('save', function (next) {
// 	console.log('2');
// 	console.log(this.country_name);
// 	console.log(this.estate_country);

// 	console.log(this.estate_country[0]);
// 	const refCountry = countryDB.findById(this.estate_country[0]);
// 	if (!refCountry) {
// 		next(
// 			new AppError('country does not exist , please create country first ', 404)
// 		);
// 	}
// 	console.log(refCountry);
// 	console.log('\n\n\n', this);
// 	refCountry.country_estates[0].push(this.id);
// 	refCountry.save();
// });

module.exports = mongoose.model('real-estates', estateSchema);
