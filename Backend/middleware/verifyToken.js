const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {

    const authHeader = req.headers.Authorization || req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({message : "Unauthorization"});
    }

    const accessToken = authHeader.split(" ")[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.email = decoded.email
            req.roles = decoded.roles
            next()
        }
    )
}

module.exports = verifyToken