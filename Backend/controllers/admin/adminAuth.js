const bcrypt = require("bcryptjs");
const adminDB = require("../../models/admin");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");

exports.signUp = async (req, res) =>  {

  
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
    const email = req.body.email;
    const confirm_password = req.body.confirmPassword;
    const admin_type = req.body.adminType;
    const phone_number = req.body.phoneNumber;


    if(password !== confirm_password){
        const err = new Error("Password and confirm password was diffrent");
        err.statusCode = 401; 
        throw err;
    }


    const hashedPassword = await bcrypt.hash(password,12);

    const admin = new adminDB({
        firstname : first_name,
        lastname : last_name,
        password : hashedPassword,
        admin_type : admin_type,
        phone_number : phone_number, 
        email:email   
    });

    console.log(phone_number);

    await admin.save();

    return res.status(202).json({
        message : "Save datas successfully"
    })


  } catch (error) {}
};

exports.logIn = async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;
  const verifyCode = req.body.verifyCode;

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
      user : 'aydinzarifieaszo@gmail.com',
      pass : "rwtrwybhtbugnqxc"
    }
  })

  const mailOptions = {
    from: 'aydinzarifieaszo@gmail.com',
    to: email,
    subject: 'Verify',
    text: verificationCode.toString(),
  };
  
  transporter.sendMail(mailOptions , (err,info) => {
    if(err){
        console.log(err);
    }
    else {
        console.log(info);
    }
  })

  const admin = await adminDB.find({email:email});

  if(verificationCode == verifyCode){
    const err = new Error("Verify code is not valid");
    err.statusCode = 401;
    throw err;
  }

  if(!admin){
    const err = new Error("admin not found");
    err.statusCode = 402;
    throw err;
  }
  const isEqual = await bcrypt.compare(password , admin[0].password);

  if(!isEqual){
    const err = new Error("password not correct");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign({email:email , adminId:admin[0]._id.toString()},"MatbietRixineum",{
    expiresIn:"1h"
  })
  
  return res.status(202).json({
    token : token,
    adminId : admin._id
  })
};
