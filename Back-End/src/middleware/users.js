const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  validateUserData: (req, res, next) => {
    if (
      !req.body.email ||
      req.body.email.length < 6 ||
      req.body.email.length > 30
    ) {
      return res
        .status(400)
        .json({ msg: "Error: Email does not follow the rules." });
    }

    if (
      !req.body.password ||
      req.body.password.length < 8 ||
      req.body.password.length > 64
    ) {
      return res
        .status(400)
        .json({ msg: "Error: Password does not follow the rules." });
    }

    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.userData = decodedToken;
      next();
    } catch (err) {
      return res.status(401).send({ msg: "Your session is no longer valid" });
    }
  },
};
