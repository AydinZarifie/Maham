const estateDB = require('../models/estate/estate');

//2023/05/08 added
exports.checkBody = (req, res, next) => {
    if (
        !req.body.cityName ||
        req.body.countryName == '' ||
        !req.body.stateView
    ) {
        return res.status(400).json({
            status: 'fail',
            message: 'invalid inputs!',
        });
    }
    next();
};

/// uu
exports.getAllEstates = async (req, res) => {
    const posts = await estateDB.find();
    res.status(200).json(posts);
};

//2023/05/08 chenged the name from 'postAddEstate' to the 'createEstate'
exports.createEstate = (req, res) => {
    const title = req.body.title;
    const estate = new estateDB({
        city_name: title,
    });

    return estate.save();
};

//2023/05/08 added
exports.getState = (req, res) => {
    res.status(200).json({
        status: 'succes',
        data: {
            states: estateDB.find({ stateId: req.params.id }),
        },
    });
};

//2023/05/08 added
exports.updateState = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {},
    });
};

//2023/05/08 added
exports.deleteState = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: {
            states: null,
        },
    });
};
