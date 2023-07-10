const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {

    const authHeader = req.get("Authorization");

    if(!authHeader){
        const err = new Error("Invalid authorization");
        err.statusCode = 402;
        throw err;
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        const err = new Error("Invalid token");
        err.statusCode = 401;
        throw err;
    }

    let decodeToken

    try {
        
        decodeToken = jwt.verify(token,"MatbietRixineum");

    } catch (error) {
        err.statusCode = 401;
        throw err;
    }

    if(!decodeToken){
        const err = new Error("decode token failed");
        err.statusCode = 401;
        throw err
    }

    req.adminId = decodeToken.adminId;

    next();
}