const jwt = require("jsonwebtoken");

const verifyRefreshToken = (refreshToken) => {
    try {
        const decode = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        return Promise.resolve(decode);
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = {verifyRefreshToken}