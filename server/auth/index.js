const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const db = require("../models");
const env = require("../config/env");

const localLogin = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const records = await db.users.findAll({ where: { email } });
      if (records !== null) {
        bcrypt.compare(password, records[0].password, (err, isMatch) => {
          if (err) {
            return done(err);
          } else if (!isMatch) {
            return done(null, false);
          } else {
            return done(null, records[0]);
          }
        });
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: env.JWT_SECRET,
  passReqToCallback: true,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (req, payload, done) => {
  try {
    const user = await db.users.findByPk(payload.sub);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    return done(err);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);
