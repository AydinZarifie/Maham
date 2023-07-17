const mongoose = require('mongoose');
const countryDB = require('./country');
const AppError = require('../utilities/appError');

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
	costumer_price: {
		type: String,
		set: (a) => (a === '' ? undefined : a),
	},
	maham_price: {
		type: String,
		set: (a) => (a === '' ? undefined : a),
	},
	filter: {
		type: String,
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
	//store blockchain data///
	landlord_address: {
		type: String,
		set: (a) => (a === '' ? undefined : a),
	},
	contract_address: {
		type: String,
	},
	mint_id: {
		type: String,
	},
	sell_position: {
		type: Boolean,
	},
	lock_position: {
		type: Boolean,
	},
	getDocument: {
		type: Boolean,
	},
	//////////////////////////

	//import createdBy///////
	/////////////////////////

	estate_rooms: [estateRoomsSchema],
	estate_facilities: [estateFacilitiesSchema],
	estate_country_ref: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Country',
			required: [true, 'estate must belong to a country'],
		},
	],
});

// refrences the estate to its country model
estateSchema.pre('save', async function (next) {
	const country = await countryDB.findOne({
		country_name: this.country_name,
	});

	if (!country) {
		return next(
			new AppError('country is not defined , please create country first', 400)
		);
	}

	this.estate_country_ref = country._id;
	next();
});

// puts the estates id inside the countries estates array
estateSchema.post('save', async function (doc, next) {
	const refCountry = await countryDB.findById(doc.estate_country_ref);
	if (!refCountry) {
		next(
			new AppError('country does not exist , please create country first ', 404)
		);
	}
	refCountry.country_estates.push(doc.id);
	refCountry.save();
});

estateSchema.pre('remove', async function () {
	const deletedId = this._id;
	const deletedMint = this.mint_id;
	const country = await countryDB.findOne({ country_name: this.country_name });
	country.country_estates.splice(country.country_estates.indexOf(deletedId), 1);
	countryDB.updateOne(
		{ _id: country._id },
		{ $push: { available_mints: deletedMint } }
	);
});

module.exports = mongoose.model('real-estates', estateSchema);
