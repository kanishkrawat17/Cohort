const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = "jwt_secret";

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

app.get('/dummy-route', (req, res) => {
  return res.json({
    message: "Dummy Route"
  })
})

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(403).json({
      message: "Username or password is incorrect",
    });
  }

  const token = jwt.sign({ username }, JWT_SECRET);

  return res.status(200).json({token}); // user gets back the token on succesffull signin and they can store or do something with it. and for future requests this token should be sent by the user.
});

app.get('/users', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Authorization token is missing',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded, "DECODED");

    // Ensure that the token is decoded successfully before proceeding
    if (!decoded || !decoded.username) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    const decodedUsername = decoded.username;
    const users = APP_USERS.filter(user => user.username !== decodedUsername);

    return res.status(200).json({
      users: users,
    });
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
});


/**
 * 3 end points in assignment
 * 1) signup (username, password, firstName)
 * 2) signin (username, password)
 * 3) getUsers (ecpecting JWT in headers)
 */
