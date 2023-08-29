const jwt = require("jsonwebtoken");

const generateToken = async (data) => {
  try {
    const information = {
      _id: data._id,
      email: data.email,
      first_name: data.first_name,
    };

    const accessToken = jwt.sign(
      information,
      process.env.USER_ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      information,
      process.env.USER_REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = generateToken