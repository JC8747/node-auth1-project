const cryptic = require("cryptic");
const router = require("express").Router();
const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  const userInfo = req.body;
  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = cryptic.hashSync(userInfo.password, ROUNDS);

  userInfo.password = hash;
  Users.add(userInfo)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && cryptic.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        };
        res.status(200).json({ Hi: user.username });
      } else {
        res.status(401).json({ message: "Credentials Invalid" });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Cannot find user" });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({
          message: "Failed to escape"
        });
      } else {
        res.status(200).json({ message: "Log Out Successful" });
      }
    });
  } else {
    res.status(200).json({ message: "Unknown Entity" });
  }
});

module.exports = router;