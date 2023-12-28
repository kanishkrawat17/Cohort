const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//  We need body parser pkg to get the data which is present in the body.
app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});

app.post("/get-body-data", (req, res) => {
  console.log(req.body.message, "Body")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// validateName and validateKidenyId acts as middlewares.
const validateUsername = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;

  if (username !== "kanishk" && password !== "123456") {
    res.status(403).json({
      msg: "Invalid username or password",
    });
    return;
  }
  // next() will pass the execution to the next call back, in this case execution will go to validateKidenyId function
  next();
};

const validateKidenyId = (req, res, next) => {
  const kidneyId = req.query.kidneyId; // enter kidenyIDd in params in postman

  if (kidneyId == 1) {
    res.status(404).json({
      msg: "Invalid Kidney",
    });
    return;
  }
  // next() will pass the execution to the next call back, in this case execution will go res with 200 staus code.
  next();
};

app.post("/health-checkup", validateUsername, validateKidenyId, (req, res) => {
  res.status(200).json({
    msg: "Success",
  });
});

app.get("/trigger-error", (req, res, next) => {
  try {
    // Simulate an error by throwing an exception
    throw new Error("This is a triggered error");
  } catch (error) {
    // Handle the error and pass it to the next middleware
    next(error);
  }
});

// Global catches or Error handling at global level.
app.use((err, req, res, next) => {
  console.log("Global catches for catching the errors.")
  res.status(500).json({
    message: 'Something went wrong',
  })
});
