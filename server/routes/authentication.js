const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jwt-simple");
const passport = require("passport");
const env = require("../config/env");
require("../auth/index");

// body parser
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const requireLogin = passport.authenticate("local", { session: false });
const requireJwt = passport.authenticate("jwt", { session: false });

const createToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, env.JWT_SECRET);
};

router.get("/checkAuth", requireJwt, (req, res) => {
  console.log(req.user); // routes that pass jwtStrategy will have the user payload data parsed to req.user
  res.send("success");
});

router.post("/login", requireLogin, async (req, res) => {
  console.log("login");
  res.json({ token: createToken(req.user) });
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const password = await bcrypt.hashSync(req.body.password, 8);
  try {
    const records = await db.users.findAll({
      where: {
        email,
      },
    });

    if (records.length === 0) {
      // Unique user, add to db
      const user = await db.users.create({ email, password });
      const jwtToken = createToken(user);
      return res.json({ token: jwtToken });
    } else {
      return res.status(422).send({ error: "Error: Email already exists." });
    }
  } catch (err) {
    return res.status(423).send({ error: "Can't access database." });
  }
});

module.exports = router;
