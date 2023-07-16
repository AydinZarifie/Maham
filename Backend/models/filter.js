const mongoose = require("mongoose");

const filterSchema = mongoose.Schema({

    filterName:{
        type:String,
        required:true,
        unique : true
    },
    filterImageUrl : {
        type :String,
        required:true,
        unique:true
    }   

})


module.exports = mongoose.model('Filter' , filterSchema)