const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = "123456";

app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`);
});

const APP_USERS = [
  {
    username: "Robin",
    password: "robin12",
    content: "I am robin",
  },
  {
    username: "kanishk",
    password: "12345",
    content: "I am Kanishk",
  },
  {
    username: "Julie",
    password: "julie12",
    content: "I am julie",
  },
];

const userExists = (username, password) => {
  const user = APP_USERS.find(
    (user) => user.username === username && user.password === password
  );

  return user ? true : false;
};

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(403).json({
      message: "Username or password is incorrect",
    });
  }

  const token = jwt.sign({username: username}, JWT_SECRET);

  return res.status(200).json(token);
});

// app.get('/users', authenticateUser, (req, res) => {
//     console.log(req.user);
//     res.json(APP_USERS);
// });

/**
 * 3 end points in assignment
 * 1) signup (username, password, firstName)
 * 2) signin (username, password)
 * 3) getUsers (ecpecting JWT in headers)
 */
