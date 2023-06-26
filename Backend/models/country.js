const mongoose = require("mongoose");


const country = new mongoose.Schema({
    country_name :{
        type:String
    },
    cities:{
        type:Array
    },
    country_logo:{
        type:String
    },
    cities:{
        type:Array
    }
})


module.exports = mongoose.model("Country" , country);