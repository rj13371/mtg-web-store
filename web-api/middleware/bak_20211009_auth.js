const jwt = require("jsonwebtoken");

const env = process.env;

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
    // without cookies, how Roland and I did it on 10/04/2021
    // req.body.token || req.query.token || req.headers["x-access-token"];


  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, env.TOKEN_KEY);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    return next();
  } catch {
    return res.status(401).send("Invalid Token");
  }
};

