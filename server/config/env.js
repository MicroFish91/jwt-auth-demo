const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  DB_PW: process.env.DB_PW || null,
  JWT_SECRET: process.env.JWT_SECRET || "myDefaultSecret",
};
