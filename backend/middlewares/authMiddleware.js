const jwt = require("jsonwebtoken");

exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access

exports.isAdmin = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
