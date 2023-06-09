const estateDB = require("../../models/estate");
const fs = require("fs");
const path = require("path");
const catchAsync = require("./../../utilities/catchAsync");
const AppError = require("./../../utilities/appError");

//2023/05/08 added`
exports.checkBody = (req, res, next) => {
  if (!req.body.cityName || req.body.countryName == "" || !req.body.stateView) {
    return res.status(400).json({
      status: "fail",
      message: "invalid inputs!",
    });
  }
  next();
};

exports.getAllEstates = async (req, res) => {
  const posts = await estateDB.find();
  res.status(200).json(posts);
};

//2023/05/08 chenged the name from 'postAddEstate' to the 'createEstate'
exports.createEstate = async (req, res, next) => {
  console.log("hwllo");
  const inputs = {
    ///////////////////////////////////////////////////////////// getState
    estate_title: req.body.tite,
    city_name: req.body.cityName,
    country_name: req.body.countryName,
    main_street: req.body.streetName,
    building_number: req.body.plate,
    floor_number: req.body.numberOfFloor,
    location: req.body.location,
    state_description: req.body.description,
    estate_type: req.body.type,
    imageUrl: req.files.images.map((el) => {
      return el.path;
    }),
    introduction_video: req.files.video.map((el) => {
      return el.path;
    }),
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
    estate_title: inputs.estate_title,
    city_name: inputs.title,
    country_name: inputs.country_name,
    main_street: inputs.main_street,
    building_number: inputs.building_number,
    floor_number: inputs.floor_number,
    location: inputs.location,
    state_description: inputs.state_description,
    estate_type: inputs.estate_type,
    imageUrl: inputs.imageUrl,
    introduction_video: inputs.introduction_video,
    // minor_street: inputs.minor_street,
    // unit_number: inputs.unit_number ,
    // postal_code: inputs.postal_code ,
    // estate_view: inputs.estate_view ,

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
  // return null // for now null

  return res.status(201).json({
    status: "success",
    message: "estate created",
  });
};
//2023/05/08 added
exports.getEditEstate = async (req, res) => {
  const estateId = req.params.estateId;
  const estate = await estateDB.findById(estateId);
  res.status(200).json(estate);
};

//2023/05/08 added
exports.updateEstate = async (req, res, next) => {
  const estateId = req.params.estateId;

  const estate = await estateDB.findById(estateId);

  const title = req.body.es;
  const country_name = req.body.countryName;
  const city_name = req.body.cityName;
  const numberOfUnit = req.body.numberOfUnit;
  const street_name = req.body.streetName;
  const plate = req.body.plate;
  const bedroom_check = req.body.checkBedroom;

  if (req.files.images) {
    clearImage(estate.imageUrl);
    estate.imageUrl = req.files.images.map((el) => {
      return el.path;
    });
  }

  if (req.files.video) {
    clearVideo(estate.introduction_video);
    estate.introduction_video = req.files.video.map((el) => {
        return el.path
    })
  }

  estate.estate_title = title;
  estate.country_name = country_name;
  estate.city_name = city_name;
  estate.estate_rooms[0].bedroom = bedroom_check;

  console.log(estate.estate_rooms[0].bedroom);

  await estate.save();

  res.status(200).json({
    status: "success",
    message: "succesfuly updated!",
    // just for seeing the result and wont be included at the otiginal app
  });
};

//added : 2023/05/08  , implemented : 2023/06/04
exports.deleteEstate = async (req, res, next) => {
  const est = await estateDB.findByIdAndDelete(req.params.estateId);

  if (!est) {
    return next(new AppError("estate with that Id not found", 404));
  }

  clearImage(est.imageUrl);
  clearVideo(est.introduction_video);

  res.status(204).json({
    status: "success",
    message: `estate withID deleted`,
    data: null,
  });
};

const clearImage = async (filePath) => {
  filePath.forEach(async (imagePath) => {
    imagePath = path.join(__dirname, "../..", imagePath);
    if (await fs.existsSync(imagePath)) {
      await fs.unlinkSync(imagePath, (err) => {
        throw err;
      });
      console.log("Image deleted successfully");
    } else {
      console.log("Image not found");
    }
  });
};
const clearVideo = async (filePath) => {
  filePath.forEach(async (videoPath) => {
    videoPath = path.join(__dirname, "../..", videoPath);
    if (await fs.existsSync(videoPath)) {
      await fs.unlinkSync(videoPath, (err) => {
        throw err;
      });
      console.log("Image deleted successfully");
    } else {
      console.log("Image not found");
    }
  });
};
