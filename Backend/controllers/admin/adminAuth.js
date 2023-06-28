const bcrypt = require("bcryptjs");
const adminDB = require("../../models/admin");

const { validationResult } = require("express-validator");

exports.signUp = async (req, res) => {
  
try {

    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.status(422).json({
        message: "Error 422",
      });
    }

    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const password = req.body.password;
    const confirm_password = req.body.confirmPassword;
    const admin_type = req.body.adminType;
    const phone_number = req.body.phoneNumber;


    if(password !== confirm_password){
        const err = new Error("Password and confirm password was diffrent");
        throw err;
    }


    const hashedPassword = await bcrypt.hash(password,12);

    const admin = new adminDB({
        firstname : first_name,
        lastname : last_name,
        password : hashedPassword,
        admin_type : admin_type,
        phone_number : phone_number,    
    });

    await admin.save();

    return res.status(202).json({
        message : "Save datas successfully"
    })


  } catch (error) {}
};

exports.logIn = (req, res) => {

};
