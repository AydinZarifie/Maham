const countryDB = require('../../models/country');
const catchAsync = require('./../../utilities/catchAsync');

// exports.postAddCountry = (req, res) => {
//     const country_name = req.body.countryName;
//     console.log(country_name);
//     return res.json({ message: 'Success' });
// };

//////////////////

exports.getAllCountries = catchAsync(async (req, res, next) => {
    const countries = await countryDB.find();
    console.log(countries);
    res.status(200).json({
        status: 'success',
        data: {
            countries,
        },
    });
    next();
});

// age yebar country ro add konim , va dafe dige hamun country ro entexab konim ke shahri behesh ezafe konim , lazeme bazam country name vared konim ? age nakonim be megdar jadid (ke null hast) update mishe ya gabli mimune ?
exports.postAddCountry = catchAsync(async (req, res, next) => {
    console.log(req);
    console.log(req.files);
    const inputs = {
        countryName: req.body.countryName,
        countryCities: req.body.cityName,
        countryLogo: req.files.logo.path,
    };
    const newCountry = new countryDB({
        country_name: inputs.countryName,
        country_cities: inputs.countryCities,
        country_logo: inputs.countryLogo,
    });
    await newCountry.save();

    return res.status(201).json({
        status: 'success',
    });
});
