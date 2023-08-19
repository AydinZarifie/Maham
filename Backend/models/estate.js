const mongoose = require('mongoose');
const countryDB = require('./country');
const AppError = require('../utilities/error/appError');
const catchAsync = require('../utilities/error/catchAsync');

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

const estateSchema = new mongoose.Schema(
	{
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
		customer_price: {
			type: Number,
			set: (a) => (a === '' ? undefined : a),
		},
		maham_price: {
			type: Number,
			set: (a) => (a === '' ? undefined : a),
		},
		nesbat: {
			type: String,
		},
		volume: {
			type: Number,
			default: 0,
			set: (a) => (a === '' ? undefined : a),
		},
		///
		estate_description: {
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
		//store blockchain data///
		landlord_address: {
			type: String,
		},
		contract_address: {
			type: String,
		},
		mint_id: {
			type: String,
			unique: true,
		},
		sell_position: {
			type: Boolean,
			default: false,
		},
		lock_position: {
			type: Boolean,
			default: false,
		},
		getDocument: {
			type: Boolean,
		},
		filter: {
			type: [String],
		},
		country_ref: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Country',
		},

		//import createdBy///////
		/////////////////////////

		estate_rooms: [estateRoomsSchema],
		estate_facilities: [estateFacilitiesSchema],
	},
	{ timestamps: true }
);

estateSchema.pre('save', async function (next) {
	if (!this.isNew) {
		return next();
	}

	const country = await countryDB.findOne({
		country_name: this.country_name,
	});

	if (!country) {
		return next(
			new AppError('country does not exist ,please create country first', 404)
		);
	}

	if (!country.cities.includes(this.city_name)) {
		return next(new AppError('city does not exist', 404));
	}

	const startsWith =
		country.country_code +
		(country.cities.indexOf(this.city_name) + 1).toString();

	const estateNum = this.mint_id.slice(startsWith.length, this.mint_id.length);

	if (country.available_mints.includes(startsWith + estateNum)) {
		country.available_mints.splice(
			country.available_mints.indexOf(startsWith + estateNum),
			1
		)[0];
	} else {
		const obj = {
			...country.last_mints,
			[startsWith]: `${estateNum}`,
		};

		// 1) update the lastMint object of the country >> just if document is NEW
		country.last_mints = obj;
	}

	await country.save();

	next();
});

estateSchema.pre('save', async function (next) {
	// if document is not NEW or if it is , then if the country_name field is NOT MODIFIED >> do NOTHING
	if (!this.isNew || !this.isModified('country_name')) {
		return next();
	}

	const country = await countryDB.findOne({
		country_name: this.country_name,
	});

	if (!country) {
		return next(
			new AppError('country does not exist ,please create country first', 404)
		);
	}
	const countryId = country._id;

	if (this.isNew) {
		// the document is being created and NEW

		this.country_ref = countryId;

		// 3) Put estateId >> inside country's estates array >> just if document is NEW
		country.country_estates.push(this._id);

		await country.save();
	} else if (this.isModified('country_name')) {
		// document is being EDITED
		this.country_ref = countryId;
		await country.save();
	}
	next();
});

estateSchema.pre('save', function (next) {
	this.nesbat = (
		parseFloat(this.customer_price) / parseFloat(this.maham_price)
	).toFixed(2);
	next();
});

// Add mintId of the delted estate >> into country's available mints
estateSchema.pre(
	'deleteOne',
	{ document: true, query: false },
	async function (next) {
		const deletedEstateId = this._id;
		const deletedMint = this.mint_id;

		const country = await countryDB.findOne({
			country_name: this.country_name,
		});

		if (!country) {
			return next(new AppError('country does not exist', 404));
		}

		country.country_estates.splice(
			country.country_estates.indexOf(deletedEstateId),
			1
		);

		country.available_mints.push(deletedMint);

		await country.save({ runValidators: false });

		next();
	}
);
// update The users assets array when a but operation gets performed //

module.exports = mongoose.model('real_estates', estateSchema);
