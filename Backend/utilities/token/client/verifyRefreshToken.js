const jwt = require("jsonwebtoken");

const verifyRefreshToken = (token) => {
    try {
        
        const decode = jwt.verify(token , process.env.USER_REFRESH_TOKEN_SECRET);
        return Promise.resolve(decode);

    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = verifyRefreshToken;