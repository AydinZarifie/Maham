const admin = require("../../models/admin");
const adminDB = require("../../models/admin");
const estateDB = require("../../models/estate");
const catchAsync = require("../../utilities/Errors/catchAsync");
const {formtStr} = require("../../utilities/Mint");


exports.getAllAdmins = async(req,res) => {
	console.log("hellooooo");
		const admin = await adminDB.find().select([
			'firstname',
			'lastname',
			'country_name',
			'city_name',
			'admin_type'
		]).sort({firstname : 1});

	console.log(admin);
    return res.status(200).json({data:admin});
}

exports.searchAdminWithName = catchAsync(async (req, res, next) => {
	const { name } = req.body;
	console.log(name);
	if(!name){
		return res.status(403).json({
			message : "input was empty"
		})
	}
	const wordToInclude = new RegExp(name, 'ig');

	const admins = await adminDB.aggregate([
		{
			$match: {
				$or: [{ firstname: wordToInclude }, { lastname: wordToInclude }],
			},
		},
		{
			$project: {
				firstname: 1,
				lastname: 1,
				_id: 0,
			},
		},
		{
			$sort: {
				firstname: 1,
			},
		},
	]);

	if (admins.length === 0) {
		return res.status(204).json({
			status: 'success',
			message: 'nothing matches',
		});
	}

	console.log(2);
	return res.status(200).json({
		status: 'success',
		data: admins,
	});
});	

exports.serachWithFilters = catchAsync(async (req,res,next) => {	
	
	const {adminType , countryName , cityName} = req.body;

	console.log(adminType);

	if(!adminType && !countryName && !cityName){
		return res.status(400).json({
			message : "empty value"
		})
	}

	const query = {};

	if(adminType){
		query.admin_type = formtStr(adminType)
	}
	if(countryName){
		query.country_name = countryName
	}
	if(cityName){
		query.city_name = cityName;
	}
	const admins = await adminDB.find(query).select([
		'firstname',
		'lastname',
		'country_name',
		'city_name',
		'admin_type'
	]).sort({firstname : 1});

	console.log(admins);

	return res.status(200).json({
		data : admins,
		message : "Success"
	})

})

exports.updateOtherAdmin = catchAsync(async (req, res, next) => {

	console.log("hi");

	// 1) update admin document
	const filteredFields = {
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		email: req.body.email,
		phone_number: req.body.phoneNumber,
		country_name : req.body.country,
		city_name : req.body.city,
		password : req.body.password,
		// profile_image: req.files.images[0].path,
	};

	const updatedAdmin = await adminDB.findByIdAndUpdate(
		// req.admin.id,
		req.params._id,
		filteredFields,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedAdmin) {
		return next(new AppError('Updated successfully ', 200));
	}
	return res.status(200).json({
		status: 'success',
		message: 'updated successfully',
		data: updatedAdmin,
	});
});

exports.deleteAdmin = catchAsync(async (req, res, next) => {
	console.log(req.params.id);
	const admin = await adminDB.findByIdAndDelete(req.params.id);
	console.log("hu");

	if (!admin) {
		return next(new AppError('admin with that id not found!', 404));
	}

	return res.status(204).json({
		status: 'success',
		message: 'admin deleted successfully',
	});
});

exports.getEditAdmin = catchAsync(async (req, res, next) => {
	
	const { id } = req.params;

	const admin = await adminDB
		.findOne({ _id: id })
		.select(['-_id', '-admin_country_ref', '-__v', '-updatedAt']);

	if (!admin) {
		return next(new AppError('no admin found', 404));
	}

	return res.status(200).json({
		status: 'success',
		data: admin,
	});
});

exports.getLockEstates = catchAsync(async(req,res) => {
    const lockEstate = await estateDB.find({lock_position : true});
    return res.status(200).json({data : lockEstate , message:"hello"});
})

exports.getSellPositionEstates = catchAsync(async(req,res) => {
    const estate = await estateDB.find({sell_position : true});
    return res.status(201).json({data:estate}); 
})