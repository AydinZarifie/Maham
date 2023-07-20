const jwt = require("jsonwebtoken");


const generateTokens = async (data) => {
  try {

    const information = { id: data._id, email: data.email , roles : data.admin_type};

    const accessToken = jwt.sign(
      information,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      information,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(err);
  }
};

module.exports = {generateTokens}
