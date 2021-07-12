const express = require("express");
const app = express();

app.use(require("./routes/authentication"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

/*

const jwt = require("jwt-simple");

let userInfo = {
  id: "12345",
  userName: "Matt",
  email: "me@me.com",
};

const createToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      name: user.userName,
      iat: timestamp,
    },
    "mySecret"
  );
};

const token = createToken(userInfo);

console.log(jwt.decode(token, "mySecret"));

// chrome, run atob() => atob(yyyy) => {sub: ..., name: ..., iat: ....}  [xxxx.yyyy.zzzz]

*/
