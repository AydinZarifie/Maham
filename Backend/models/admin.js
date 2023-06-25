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
    email : {
        type:String,
        required : true,
        uniqe : true
    },
    password:{
        type : String,
        required:true
    },
    type : {
        type:String,
        required:true,
    },
    //store acitivity of admins
})

module.exports = mongoose.model("Admin" , adminSchema);