const { Admin } = require("../db");

function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  Admin.findOne({
    username: username,
    password: password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      res.status(404).send("Admin doesn't exist");
    }
  }).catch((err) => {
    console.error("Error in admin authentication", err);
    res.status(500).send("Internal server error");
  })

}

module.exports = adminMiddleware;
