const jwt = require('jsonwebtoken');

const generateToken = async (data) => {
	try {
		const information = {
			_id: data._id,
			email: data.email,
			roles: data.admin_type,
		};

		const accessToken = jwt.sign(information, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '10s',
		});
		const refreshToken = jwt.sign(
			information,
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '30d' }
		);

		return Promise.resolve({ accessToken, refreshToken });
	} catch (error) {
		return Promise.reject(err);
	}
};

module.exports = generateToken;
