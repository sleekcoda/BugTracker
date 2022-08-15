const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.headers.token
    console.log(jwtToken)

    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET || "hello");

    req.user = payload.user;

    next();
  } catch (err) {
    console.log(err);
    // console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
};
