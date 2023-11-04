const jwt = require("jsonwebtoken");


const signAccessToken = async (data) => {

    try {
        const information = {
            _id : data._id,
            email : data.email,
            first_name : data.first_name
        }
    
        const accessToken = jwt.sign(information , process.env.USER_ACCESS_TOKEN_SECRET ,{
            expiresIn:'15m'
        })
    
        return Promise.resolve({accessToken})
        
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = signAccessToken