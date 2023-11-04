const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    date : {
        type:String,
        required : true
    },
    value : {
        type : String
    },
    txHash : {
        type : String,
        required : true
    },
    from : {
        type : String ,
        required : true,
    },
    to : {
        type : String ,
        required : true
    },
    method : {
        type : String ,
        required : true
    },
    mintId : {
        type :  String , 
        required : true
    }
})

module.exports = mongoose.model("transaction" , transactionSchema);