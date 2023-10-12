const estateDB = require("../../models/estate");
const fs = require("fs");
const path = require("path");
const catchAsync = require("./../../utilities/error/catchAsync");
const AppError = require("./../../utilities/error/appError");
const countryDB = require("../../models/country");
const filterDB = require("../../models/filter");
const transactionDB = require("../../models/transaction");
const { clearVideo, clearImage } = require("./../../utilities/clearFiles");
const { formatStr, generateMint } = require("./../../utilities/mint");

exports.getAllEstates = catchAsync(async (req, res) => {
  const posts = await estateDB
    .find()
    .select([
      "estate_title",
      "customer_price",
      "imageUrl",
      "country_name",
      "city_name",
    ]);
  console.log(posts);
  res.status(200).json(posts);
});

exports.getAllCountries = catchAsync(async (req, res, next) => {
  const countries = await countryDB.find();
  if (!countries) {
    return next(
      new AppError("there is no country , please create the country first", 404)
    );
  }
  return res.status(200).json({
    message: " success",
    data: countries,
  });
});

exports.getCities = catchAsync(async (req, res, next) => {
  const country = await countryDB
    .findOne({ country_name: `${req.params.countryName}` })
    .select(["cities", "-_id"]);

  if (!country) {
    return next(
      new AppError(
        "there is no such a country defined , how did u even select this ? , add the country first",
        404
      )
    );
  }
  if (country.cities.length === 0) {
    return next(
      new AppError(
        "the country has no defined cities yet ,  please add a city first ",
        404
      )
    );
  }
  return res.status(200).json({
    message: "success",
    data: country.cities,
  });
});

exports.createEstate = catchAsync(async (req, res, next) => {
  // refrencing the estate to its country instance in countryDB
  const country = await countryDB.findOne({
    country_name: `${req.body.countryName}`,
  });
  if (!country) {
    return next(new AppError("please create country first", 404));
  }
  console.log(req.body.customerPrice);
  const Id = country.id;
  console.log(req.body.mintId);
  const inputs = {
    ///////////////////////////////////////////////////////////// getState
    estate_title: formatStr(req.body.title),
    city_name: req.body.cityName,
    country_name: req.body.countryName,
    main_street: req.body.streetName,
    total_building_metraj : req.body.totalMetrage,
    building_number: req.body.plate,
    floor_number: req.body.numberOfFloor,
    location: req.body.location.toLowerCase(),
    state_description: req.body.description,
    estate_type: req.body.type,
    customer_price: Number(req.body.customerPrice),
    maham_price: Number(req.body.mahamPrice),
    summary_description : req.body.summary,
    filter: req.body.filter,
    mintId: req.body.mintId,
    unit_number: req.body.numberOfUnit,
    contract_address:
      "0x1029c94a34b125409c20d65958c95cf26360b7d61c6a4f9c7f98c7bc6b2ee0eb",
    landlor_address:
      "0x1029c94a34b125409c20d65958c95cf26360b7d61c6a4f9c7f98c7bc6b2ee0eb",
    imageUrl: req.files.images.map((el) => {
      return el.path;
    }),
    introduction_video: req.files.video.map((el) => {
      return el.path;
    }),
    // minor_street : req.body. ,

    // postal_code : req.body. ,
    // estate_view : req.body. ,

    ///////////////////////////////////////////////////////////// getRooms :
    bedroom: req.body.checkBedroom,
    bedroom_count: req.body.numberBedroom,
    bedroom_size: req.body.metrageBedroom,
    livingroom: req.body.checkLivingRoom,
    livingroom_count: req.body.numberLivingRoom,
    livingroom_size: req.body.metrageLivingRoom,
    kitchen: req.body.checkKitchen,
    kitchen_count: req.body.numberKitchen,
    kitchen_size: req.body.metrageKitchen,
    diningRoom: req.body.checkDiningroom,
    diningRoom_count: req.body.numberDiningroom,
    diningRoom_size: req.body.metrageDiningroom,
    guestRoom: req.body.checkGuestroom,
    guestRoom_count: req.body.numberGuestroom,
    guestRoom_size: req.body.metrageGuestroom,
    bathroom: req.body.checkBathroom,
    bathroom_count: req.body.numberBathroom,
    bathroom_size: req.body.metrageBathroom,
    backYard: req.body.checkGarden,
    backYard_size: req.body.metrageGarden,
    balcony: req.body.checkBalcony,
    balcony_count: req.body.numberBalcony,
    balcony_size: req.body.metrageBalcony,
    garage: req.body.checkGarage,
    garage_count: req.body.numberGarage,
    garage_size: req.body.metrageGarage,
    // frontYard: req.body. ,
    // frontYard_size: req.body. ,
    // workRoom: req.body. ,
    // workRoom_count: req.body. ,
    // workRoom_size: req.body. ,
    // conference_room: req.body. ,
    // conference_room_count: req.body. ,
    // conference_room_size: req.body. ,
    // total_building_metraj : req.body. ,
    // total_floor_count : ,

    ///////////////////////////////////////////////////////////// getFacilities :
    WiFi: req.body.checkWifi,
    furniture: req.body.checkFurniture,
    elevator: req.body.checkElevator,
    swimming_Pool: req.body.checkPool,
    fitness_center: req.body.checkGym,
    loundry_facilities: req.body.checkLaundary,
    parkingLot: req.body.checkParking,
    barbique: req.body.checkBbq,
    // security_seystem: req.body. ,
    // childcare_Center: req.body. ,
  };

  const estate = new estateDB({
    ///////////////////////////////////////////////////////////// setState :
    // stateId : ,
    estate_country_ref: Id,
    estate_title: inputs.estate_title,
    city_name: inputs.city_name,
    country_name: inputs.country_name,
    main_street: inputs.main_street,
    building_number: inputs.building_number,
    floor_number: inputs.floor_number,
    location: inputs.location,
    state_description: inputs.state_description,
    estate_type: inputs.estate_type,
    imageUrl: inputs.imageUrl,
    introduction_video: inputs.introduction_video,
    customer_price: inputs.customer_price,
    maham_price: inputs.maham_price,
    filter: inputs.filter,
    mint_id: inputs.mintId,
    unit_number: inputs.unit_number,
    landlor_address: inputs.landlor_address,
    contract_address: inputs.contract_address,
    summary_description : inputs.summary_description,
    total_building_metraj : inputs.total_building_metraj,
    // minor_street: inputs.minor_street,
    // postal_code: inputs.postal_code ,
    // estate_view: inputs.estate_view ,
    sell_position: true,
    lock_position: false,
    getDocument: false,

    ///////////////////////////////////////////////////////////// setRooms :
    estate_rooms: [
      {
        bedroom: inputs.bedroom,
        bedroom_count: inputs.bedroom_count,
        bedroom_size: inputs.bedroom_size,
        livingroom: inputs.livingroom,
        livingroom_count: inputs.livingroom_count,
        livingroom_size: inputs.livingroom_size,
        kitchen: inputs.kitchen,
        kitchen_count: inputs.kitchen_count,
        kitchen_size: inputs.kitchen_size,
        diningRoom: inputs.diningRoom,
        diningRoom_count: inputs.diningRoom_count,
        diningRoom_size: inputs.diningRoom_size,
        guestRoom: inputs.guestRoom,
        guestRoom_count: inputs.guestRoom_count,
        guestRoom_size: inputs.guestRoom_size,
        bathroom: inputs.bathroom,
        bathroom_count: inputs.bathroom_count,
        bathroom_size: inputs.bathroom_size,
        backYard: inputs.backYard,
        backYard_size: inputs.backYard_size,
        balcony: inputs.balcony,
        balcony_count: inputs.balcony_count,
        balcony_size: inputs.balcony_size,
        garage: inputs.garage,
        garage_count: inputs.garage_count,
        garage_size: inputs.garage_size,
        // frontYard: inputs.frontYard ,
        // frontYard_size: inputs.frontYard_size ,
        // workRoom: inputs.workRoom ,
        // workRoom_count: inputs.workRoom_count ,
        // workRoom_size: inputs.workRoom_size ,
        // conference_room: inputs.conference_room ,
        // conference_room_count: inputs.conference_room_count ,
        // conference_room_size: inputs.conference_room_size ,
        // total_building_metraj: inputs.total_building_metraj ,
        // total_floor_count: inputs.total_floor_count ,
      },
    ],

    ///////////////////////////////////////////////////////////// setFacilities :
    estate_facilities: [
      {
        WiFi: inputs.WiFi,
        furniture: inputs.furniture,
        elevator: inputs.elevator,
        swimming_Pool: inputs.swimming_Pool,
        fitness_center: inputs.fitness_center,
        loundry_facilities: inputs.loundry_facilities,
        parkingLot: inputs.parkingLot,
        barbique: inputs.barbique,
        // security_seystem: inputs.security_seystem,
        // childcare_Center: inputs.childcare_Center,
      },
    ],
  });

  await estate.save();


  const transaction = new transactionDB({
    date : req.body.date,
    txHash : req.body.hash,
    from : req.body.from,
    to : req.body.to,
    method : req.body.method,
    mintId : req.body.mintId
  })

  await transaction.save();

  return res.status(201).json({
    status: "success",
    message: "estate created",
  });
});

exports.searchEstateByFilter = catchAsync(async (req, res) => {
  const country_name = req.body.countryName;
  const city_name = req.body.cityName;
  const low_price = Number(req.body.price[0]);
  const high_price = Number(req.body.price[1]);

  if (!country_name || !city_name) {
    console.log(2);
    return res.status(401).json({
      message: "Empty field",
    });
  }

  const estate = await estateDB.find({
    customer_price: { $gte: low_price, $lte: high_price },
    country_name: country_name,
    city_name: city_name,
  });

  return res.status(200).json({
    message: "Successfully",
    estate: estate,
  });
});

exports.sendMint = catchAsync(async (req, res, next) => {
  // 1) get the Country & City name from Response
  const modifiedCountryName = formatStr(req.body.countryName);
  const modifiedCityName = formatStr(req.body.cityName);

  // 2) find the country
  const country = await countryDB
    .findOne({ country_name: modifiedCountryName })
    .select([
      "country_code",
      "country_name",
      "cities",
      "country_estates",
      "last_mints",
      "available_mints",
    ]);

  if (!country || !country.cities.includes(modifiedCityName)) {
    return next(new AppError("country or city does not exist!", 404));
  }

  // 3) generate the Mint based on given country and city
  const mint = generateMint(country, modifiedCityName);
  // 5) send respose
  return res.status(200).json({
    status: "success",
    message: "mint created succesfully ",
    data: mint,
  });
});

exports.updateEstate = catchAsync(async (req, res, next) => {
  const estateId = req.params.estateId;

  // implement update mint proccess ///////////////////////
  const estate = await estateDB.findById(estateId);

  const inputs = {
    ///////////////////////////////////////////////////////////// getState
    estate_title: req.body.title,
    city_name: req.body.cityName,
    country_name: req.body.countryName,
    main_street: req.body.streetName,
    minor_street: req.body.plate,
    building_number: req.body.plate,
    unitNumber: req.body.numberOfUnit,
    floor_number: req.body.numberOfFloor,
    location: req.body.location,
    state_description: req.body.description,
    estate_type: req.body.type,
    maham_price: req.body.mahamPrice,
    customer_price: estate.customer_price,
    filter_name: req.body.filter,
    mintId: req.body.mintId,

    // introduction_video: req.files.video.map((el) => {
    //     return el.path;
    // }),
    // introduction_video: req.files.video.map((el) => {
    //     return el.path;
    // }),
    // minor_street : req.body. ,
    // unit_number : req.body. ,
    // postal_code : req.body. ,
    // estate_view : req.body. ,

    ///////////////////////////////////////////////////////////// getRooms :
    bedroom: req.body.checkBedroom,
    bedroom_count: req.body.numberBedroom,
    bedroom_size: req.body.metrageBedroom,
    livingroom: req.body.checkLivingRoom,
    livingroom_count: req.body.numberLivingRoom,
    livingroom_size: req.body.metrageLivingRoom,
    kitchen: req.body.checkKitchen,
    kitchen_count: req.body.numberKitchen,
    kitchen_size: req.body.metrageKitchen,
    diningRoom: req.body.checkDiningroom,
    diningRoom_count: req.body.numberDiningroom,
    diningRoom_size: req.body.metrageDiningroom,
    guestRoom: req.body.checkGuestroom,
    guestRoom_count: req.body.numberGuestroom,
    guestRoom_size: req.body.metrageGuestroom,
    bathroom: req.body.checkBathroom,
    bathroom_count: req.body.numberBathroom,
    bathroom_size: req.body.metrageBathroom,
    garden: req.body.checkGarden,
    garden_count: req.body.numberGarden,
    garden_size: req.body.metrageGarden,
    balcony: req.body.checkBalcony,
    balcony_count: req.body.numberBalcony,
    balcony_size: req.body.metrageBalcony,
    garage: req.body.checkGarage,
    garage_count: req.body.numberGarage,
    garage_size: req.body.metrageGarage,

    // workRoom: req.body. ,
    // workRoom_count: req.body. ,
    // workRoom_size: req.body. ,
    // conference_room: req.body. ,
    // conference_room_count: req.body. ,
    // conference_room_size: req.body. ,
    // total_building_metraj : req.body. ,
    // total_floor_count : ,

    ///////////////////////////////////////////////////////////// getFacilities :
    gardenFac: req.body.checkGardenFacility,
    WiFi: req.body.checkWifi,
    furniture: req.body.checkFurniture,
    elevator: req.body.checkElevator,
    swimming_Pool: req.body.checkPool,
    fitness_center: req.body.checkGym,
    loundry_facilities: req.body.checkLaundary,
    parkingLot: req.body.checkParking,
    barbique: req.body.checkBbq,
    // security_seystem: req.body. ,
    // childcare_Center: req.body. ,
  };
  ///////////////////////////////////////////////////////////// setState :
  // stateId : ,
  (estate.estate_title = inputs.estate_title),
    (estate.unit_number = inputs.unitNumber),
    (estate.city_name = inputs.city_name),
    (estate.country_name = inputs.country_name),
    (estate.main_street = inputs.main_street),
    (estate.minor_street = inputs.minor_street),
    (estate.building_number = inputs.building_number),
    (estate.floor_number = inputs.floor_number),
    (estate.location = inputs.location),
    (estate.state_description = inputs.state_description),
    (estate.estate_type = inputs.estate_type),
    (estate.customer_price = inputs.customer_price),
    (estate.maham_price = inputs.maham_price),
    (estate.filter = inputs.filter_name),
    (estate.mint_id = inputs.mintId);
  // get & set images
  if (req.files.images) {
    clearImage(estate.imageUrl);
    estate.imageUrl = req.files.images.map((el) => {
      return el.path;
    });
  }

  if (req.files.video) {
    clearVideo(estate.introduction_video);
    estate.introduction_video = req.files.video.map((el) => {
      return el.path;
    });
  }
  // (estate.imageUrl = req.files.images ? inputs.imageUrl : estate.imageUrl),
  //     (estate.introduction_video = req.files.video
  //         ? inputs.introduction_video
  //         : estate.introduction_video),
  // set rooms
  (estate.estate_rooms[0].bedroom = inputs.bedroom),
    (estate.estate_rooms[0].bedroom_count = inputs.bedroom_count),
    (estate.estate_rooms[0].bedroom_size = inputs.bedroom_size),
    (estate.estate_rooms[0].livingroom = inputs.livingroom),
    (estate.estate_rooms[0].livingroom_count = inputs.livingroom_count),
    (estate.estate_rooms[0].livingroom_size = inputs.livingroom_size),
    (estate.estate_rooms[0].kitchen = inputs.kitchen),
    (estate.estate_rooms[0].kitchen_count = inputs.kitchen_count),
    (estate.estate_rooms[0].kitchen_size = inputs.kitchen_size),
    (estate.estate_rooms[0].diningRoom = inputs.diningRoom),
    (estate.estate_rooms[0].diningRoom_count = inputs.diningRoom_count),
    (estate.estate_rooms[0].diningRoom_size = inputs.diningRoom_size),
    (estate.estate_rooms[0].guestRoom = inputs.guestRoom),
    (estate.estate_rooms[0].guestRoom_count = inputs.guestRoom_count),
    (estate.estate_rooms[0].guestRoom_size = inputs.guestRoom_size),
    (estate.estate_rooms[0].bathroom = inputs.bathroom),
    (estate.estate_rooms[0].bathroom_count = inputs.bathroom_count),
    (estate.estate_rooms[0].bathroom_size = inputs.bathroom_size),
    //  (estate.estate_rooms[0].garden = inputs.garden),
    (estate.estate_rooms[0].garden_count = inputs.garden_count),
    (estate.estate_rooms[0].garden_size = inputs.garden_size),
    (estate.estate_rooms[0].balcony = inputs.balcony),
    (estate.estate_rooms[0].balcony_count = inputs.balcony_count),
    (estate.estate_rooms[0].balcony_size = inputs.balcony_size),
    (estate.estate_rooms[0].garage = inputs.garage),
    (estate.estate_rooms[0].garage_count = inputs.garage_count),
    (estate.estate_rooms[0].garage_size = inputs.garage_size),
    // set facilities garden minor
    (estate.estate_facilities[0].WiFi = inputs.WiFi),
    //(estate.estate_facilities[0].garden = inputs.gardenFac),
    (estate.estate_facilities[0].furniture = inputs.furniture),
    (estate.estate_facilities[0].elevator = inputs.elevator),
    (estate.estate_facilities[0].swimming_Pool = inputs.swimming_Pool),
    (estate.estate_facilities[0].fitness_center = inputs.fitness_center),
    (estate.estate_facilities[0].loundry_facilities =
      inputs.loundry_facilities),
    (estate.estate_facilities[0].parkingLot = inputs.parkingLot),
    (estate.estate_facilities[0].barbique = inputs.barbique),
    await estate.save();

  return res.status(200).json({
    status: "success",
    message: "succesfuly updated!",
    // just for seeing the result and wont be included at the otiginal app
  });
});

exports.getEditEstate = catchAsync(async (req, res, next) => {
  const estateId = req.params.estateId;
  if (!estateId) {
    return next(new AppError("please provide estate id", 400));
  }
  const estate = await estateDB.findById(estateId);
  if (!estate) {
    return next(new AppError("estate wth that ID does not exists", 404));
  }
  res.status(200).json(estate);
});

exports.postFilter = catchAsync(async (req, res, next) => {
  try {
    const filterName = formatStr(req.body.filterName);
    const imageUrl = req.files.images[0].path;

    if (!filterName || !imageUrl) {
      return next(new AppError("filtername or image was empty", 403));
      // res.status(403).json({ message: 'filtername or image was empty' });
    }

    const filter = new filterDB({
      filterName: filterName,
      filterImageUrl: imageUrl,
    });

    await filter.save();

    return res.status(202).json({
      status: "success",
      message: "successfully added filter",
    });
  } catch (error) {
    return res.status(401).json({
      message: "filter already exist",
    });
  }
});

exports.getAllFilters = catchAsync(async (req, res, next) => {
  const filters = await filterDB.find();

  // if (filters.length === 0) {
  // 	return next(new AppError('there is no filter', 200));
  // }
  return res.status(200).json({
    status: "success",
    data: filters,
  });
});

exports.getAddEstateFilters = catchAsync(async (req, res, next) => {
  const filter = await filterDB.find().select("filterName");

  const filters = filter.map((el) => {
    return el.filterName;
  });

  if (!filter) {
    return next(new AppError("no such a filter", 200));
  }

  return res.status(200).json({
    status: "success",
    data: filters,
  });
});

exports.deleteEstate = catchAsync(async (req, res, next) => {
  const deletingEstate = await estateDB.findById(req.params.estateId);

  if (!deletingEstate) {
    return next(new AppError("estate with that Id not found", 404));
  }

  await clearImage(deletingEstate);
  await clearVideo(deletingEstate.introduction_video);

  await deletingEstate.deleteOne();

  return res.status(200).json({
    status: "success",
    message: `estate with ID deleted`,
    data: null,
  });
});

exports.searchEestatesByFilterName = async (req, res, next) => {
  // 1) get the search criteria from request body
  const { filterName } = req.body;

  if (!filterName) {
    return next(new AppError("please choose an option", 400));
  }

  // 2) Execute the query
  const results = await estateDB.find({
    filter: { $in: [filterName] },
  });

  if (results.length === 0) {
    return res.status(204).json({
      message: "nothing matches",
    });
  }
  console.log(results);
  return res.status(200).json({
    message: "successfull",
    result: results.length,
    data: results,
  });
};

exports.getLockEstates = catchAsync(async (req, res, next) => {
  const lockedEstates = await estateDB
    .find({ lock_position: true })
    .select([
      "estate_title",
      "contract_address",
      "landlor_address",
      "country_name",
      "city_name",
      'customer_price',
      'lock_position'
    ]);

    console.log(lockedEstates);
  if (!lockedEstates || lockedEstates.length === 0) {
    return res.status(200).json({ message: "There is no locked estate!" });
  }

  return res.status(200).json({ status: "success", data: lockedEstates });
});

exports.getSellPositionEstates = catchAsync(async (req, res, next) => {
  const estates = await estateDB.find({ sell_position: true });

  if (!estates || estates.length === 0) {
    return res
      .status(200)
      .json({ message: "there is no in-sell-position Estate" });
  }

  return res.status(200).json({ data: estates });
});
