const env = require("./env");

module.exports = {
  development: {
    username: "postgres",
    password: env.DB_PW,
    database: "auth_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
