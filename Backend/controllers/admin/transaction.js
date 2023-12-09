const transactionDB = require("../../models/transaction");
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');

exports.transaction = catchAsync(async(req,res,next) => {
    const {mintId, hash , from , to , date,value , method} = req.body;

    if(!mintId || !hash || !from || !to || !date || !value || !method){
        return next(new AppError('empty element', 400));
    }

    const transaction = {
        mintId : mintId,
        hash : hash,
        from : from,
        to : to,
        date: date,
        value : value,
        method : method
    }

    const transaction_type1 = new transactionDB.type_1(transaction);
    await transaction_type1.save();

    res.status(200).json({
        message : "Transaction saved successfulle"
    })
})
