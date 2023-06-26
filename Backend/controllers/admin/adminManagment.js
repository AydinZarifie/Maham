const countryDB = require("../../models/country");

exports.postAddCountry = (req , res) => {
    
    const country_name = req.body.countryName;
    const logo_url = req.files.images[0].path;

    console.log(logo_url);

    return res.json({message : "Success"})  
}
