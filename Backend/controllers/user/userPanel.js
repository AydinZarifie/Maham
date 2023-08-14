const userDB = require('../../models/user');
const estateDB = require('../../models/estate');
const catchAsync = require('./../../utilities/error/catchAsync');
const AppError = require('./../../utilities/error/appError');

exports.getMyAssets = catchAsync(async (req, res, next) => {
	const user = await userDB.findOne({ id: req.body.id }).populate({
		path: 'assets',
		// which fields ?
		select: ['country_name', 'city_name', 'mint_id'],
	});

	console.log(user);

	if (!user || user.length === 0) {
		return next(new AppError('there is no user weith that ID', 204));
	}

	if (user.assets.length === 0) {
		return next(new AppError('user has no properties', 204));
	}

	return res.status(200).json({
		status: 'success',
		length: user.assets.length,
		data: user.assets,
	});
});

