const jwt = require('jsonwebtoken');

const signAccessToken = (data) => {
	try {
		const information = {
			id: data._id,
			email: data.email,
			roles: data.admin_type,
		};

		const accessToken = jwt.sign(information, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '10s',
		});

		return Promise.resolve({ accessToken });
	} catch (err) {
		return Promise.reject(err);
	}
};

module.exports = signAccessToken;
