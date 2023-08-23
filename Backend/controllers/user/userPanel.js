const countryDB = require('./../../models/country');

exports.getCountries = async(req,res) => {
	const countries = await countryDB.find().select(['country_name' , 'country_logo']);
	return res.status(200).json({
		message : "Success",
		data : countries
	})
}

exports.getCities = async(req,res) => {

	const country = req.params.countryName;

	if(!country){
		return res.status(401).json({
			message:"The country filed was empty"
		})
	}

	const cities = await countryDB.findOne({country_name : country}).select('cities');
	if(!cities){
		return res.status(401).json({
			message : "The city not found"
		})
	}

	return res.status(200).json({
		data:cities,
		message:"success"
	})

}

