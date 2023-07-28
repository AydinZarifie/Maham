const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
/////////////////////////////////////////////////////
const adminDB = require('../../models/admin');
/////////////////////////
const catchAsync = require('../../utilities/Errors/catchAsync');
const AppError = require('../../utilities/Errors/appError');
/////////////////////////////////////////////////////
const {generateTokens} = require("../../utilities/token/generateToken")
const {signAccessToken} = require("../../utilities/token/signAccessToken");
const {verifyRefreshToken} = require("../../utilities/token/verifyRefreshToken");
const {formtStr} = require("../../utilities/Mint");
const {sendEmail} = require("../../utilities/sendEmail");


exports.signUp = async (req, res, next) => {

  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.status(422).json({
        message: 'Error 422',
      });
    }
  
    // getting information from request body
    const {
      firstName,
      lastName,
      password,
      email,
      confirmPassword,
      adminType,
      phoneNumber,
      country,
      city,
    } = req.body;

    if (password !== confirmPassword) {
      return next(
        new AppError('password and password confirmation doesnt match', 400)
      );
    }
  
    const hashedPassword = await bcrypt.hash(password, 12);
  
    const admin = new adminDB({
      firstname: formtStr(firstName),
      lastname: formtStr(lastName),
      password: hashedPassword,
      admin_type: formtStr(adminType),
      phone_number: phoneNumber,
      email: email,
      country_name : formtStr(country),
      city_name : formtStr(city),
    });
  
    await admin.save();
  
    return res.status(202).json({
      status: 'success',
      message: 'signed up successfully',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({message : 'failed'})
  }
};

exports.logIn = catchAsync(async (req, res, next) => {
  
  // check Valid email
  const error = validationResult(req);
	if (!error.isEmpty()) {
		console.log(error.array());
		return res.status(405).json({
			message: 'Error 405',
		});
	}

  const { email,password, verificationCode } = req.body;
  const verificationCodeSession = req.session.verificationCode;

	// 1) check if email or password provided
	if (!email || !password) {
		return next(new AppError('please provide email and password', 400));
	}

	// 2) check if user exists && password is correct
	const admin = await adminDB.findOne({ email })

  // 3) check admin exists
  if (!admin) {
    return next(new AppError('admin not found', 405));
  }

  const isEqual = await bcrypt.compare(password, admin.password);
  // 4) check password
  if (!isEqual) {
    return next(
      new AppError('username or password is incorrect ', 405) //not authorized
    );
  }

  // 5) check cookie expire
  if(!req.session.verificationCode){
    return res.status(402).json({
      message : "session was expire"
    })
  }

  // 6) check verificationCode
  if(verificationCode !== verificationCodeSession.toString()){
      return res.status(401).json({
      message : "verification code is not valid"
    })
  }

  /////////////////////////////////////////////////////////////////

  const {accessToken , refreshToken} = await generateTokens(admin);

  res.cookie('jwt' , refreshToken , {
      httpOnly : true,
      secure : true,
      sameSite:'none',
      maxAge : 7 * 60 * 60 * 100,
  });

  req.session.destroy((err) => {
    if(err){
      console.log("destroyed failed");
    }
  });

  return res.status(200).json({
    token : accessToken
  })


});

exports.verificationCode = catchAsync(async (req, res) => {  
  const error = validationResult(req);
	if (!error.isEmpty()) {
		console.log(error.array());
		  return res.status(405).json({
			message: 'Error 405',
		});
	}

  const email = req.body.email
	const password = req.body.password;

	const admin = await adminDB.findOne({ email });

	if (!admin) {
		return res.status(405).json({
			message: 'email wrong',
		});
	}

	const isEqual = await bcrypt.compare(password, admin.password);

	if (!isEqual) {
		return res.status(405).json('password wrong');
	}

	const verificationCode = Math.floor(100000 + Math.random() * 900000);

  console.log(verificationCode);

  req.session.verificationCode = verificationCode;

  console.log(req.session.verificationCode);


  const mailOptions = {
    email: email,
    subject: 'Ver',
    text: 'hello there ',
    verificationCode,
  };

  await sendEmail(mailOptions);
 
	return res.status(201).json({
		message: 'Success',
	});
});

exports.refreshToken = catchAsync(async (req,res) => {

    console.log("refresh");
    const cookie = req.cookies;
    if(!cookie?.jwt){return res.status(403).json({message : "cookie empty"})};

    const refreshToken  = cookie.jwt;

    const decode = await verifyRefreshToken(refreshToken);
    if(!decode){return res.status(403).json({message : "refreshToken in not valid"})};

    console.log(decode);

    const admin = await adminDB.findOne({email : decode.email});
    if(!admin){return res.status(401).json({message:'Unauthorization'})};

    const accessToken = await signAccessToken(admin);

    return res.status(201).json(accessToken)
});

exports.logout = catchAsync(async (req,res) => {

  const cookie = req.cookies;
  if(!cookie?.jwt){return res.status(204)}
  res.clearCookie('jwt',{httpOnly : true, secure : true , sameSite :'None'})

  return res.status(200).json({message : 'Success'})

});

