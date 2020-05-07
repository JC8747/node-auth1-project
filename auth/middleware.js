const cryptic = require("cryptic");

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ you: "Access Denied" });
  }
};