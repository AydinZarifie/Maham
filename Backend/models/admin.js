const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    firstname :{
        type : String,
        required : true
    },
    lastname : {
        type : String ,
        required : true
    },
    phone_number:{
        type:String,
        required:true,
        unique : true,
    },
    email : {
        type:String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required:true
    },
    admin_type : {
        type:String,
        required:true,
    },
    verification_code : {
        type : String,
    }
    //store acitivity of admins
},{ timestamps: true ,strict: true})

module.exports = mongoose.model("Admin" , adminSchema); 