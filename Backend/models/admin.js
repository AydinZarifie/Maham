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
        uniqe : true,
    },
    email : {
        type:String,
        required : true,
        uniqe : true
    },
    password:{
        type : String,
        required:true
    },
    admin_type : {
        type:String,
        required:true,
    },
    //store acitivity of admins
},{ timestamps: true })

module.exports = mongoose.model("Admin" , adminSchema); 