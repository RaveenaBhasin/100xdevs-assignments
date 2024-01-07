const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.authentication;
  const words = token.split(" ");
  const jwtToken = words[1];
  const decodedToken = jwt.verify(jwtToken, JWT_SECRET);

  if (decodedToken.username) {
    req.username = decodedToken.username;
    next();
  }
  else {
    res.status(403).json({
      msg: "Not a valid user"
    })
  }
}

module.exports = userMiddleware;
