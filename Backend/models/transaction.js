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
    },
    to : {
        type : String,
    },
    method : {
        type : String ,
        required : true
    },
    mintId : {
        type :  String , 
    }
})

module.exports = mongoose.model("transaction" , transactionSchema);