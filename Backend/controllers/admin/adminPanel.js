const admibDB = require("../../models/admin");
const estateDB = require("../../models/estate");

exports.getAllAdmins = async(req,res) => {
    const admin = await admibDB.find();
    return res.status(200).json({data:admin});
}
exports.getLockEstates = async(req,res) => {
    const lockEstate = await estateDB.find({lock_position : true});
    return res.status(200).json({data : lockEstate , message:"hello"});
}

exports.getSellPositionEstates = async(req,res) => {
    const estate = await estateDB.find({sell_position : true});
    return res.status(201).json({data:estate}); 
}