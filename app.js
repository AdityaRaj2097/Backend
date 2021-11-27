// import { content } from "./Static/secret";

let content = require("./Static/secret");
const express = require("express");
const app = express();
const path = require("path");
let fs = require("fs");

//  By the help o fthis we get the data in json format
app.use(express.json());
app.use(express.static("Static"));

const userRouter = express.Router();
const authRouter = express.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUser)
  .post(bodycheker, createUser)
  .patch(updateUser)
  .delete(deleteUser);

authRouter.route("/signup").post(bodycheker, signupUser);

function getUser(req, res) {
  res.send(content);
}

function bodycheker(req, res, next) {
  console.log(" inside the body checker");
  let isPresent = Object.keys(req.body).length;
  if (isPresent) {
    // next is used for exuting the next code whihc are availabe for running
    next();
  } else {
    // matalb yeah ki agr else m ayga to create use ny chalega becasue yha humne next call ny kiya and humne yhi se retrun kr diya hai
    res.send("Kindly Send the data inside body");
  }
}
function createUser(req, res) {
  // console.log(req.body);

  let body = req.body;

  // users = req.body;
  content.push(body);
  fs.writeFileSync("./Static/secret.json", JSON.stringify(content));
  res.json({
    message: "data received successfully",
    user: req.body,
  });
}

function signupUser(req, res) {
  let { name, email, password, confirmPassword } = req.body;
  console.log("req.body", req.body);
  if (password == confirmPassword) {
    let newUser = { name, email, password };
    // entry put
    content.push(newUser);
    // save in the datastorage
    console.log(" newuser _____", newUser);
    fs.writeFileSync("./Static/secret.json", JSON.stringify(content));
    res.status(201).json({
      createdUser: newUser,
    });
  } else {
    res.status(422).json({
      message: "password and confirm password do not match",
    });
  }
}
function updateUser(req, res) {
  console.log("req.body-> ", req.body);
  //update data in users obj
  let dataToBeUpdated = req.body;
  // not completed logic
  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.json({
    message: "data updated successfully",
  });
}

function deleteUser(req, res) {
  users = {};
  let dataToBeUpdated = req.body;

  for (let obj in content) {
    if (content[obj]["phoneNo"] === dataToBeUpdated.phoneNo) {
      content.pop(obj);
    }
  }

  res.json({
    message: "data has been deleted",
  });
}
app.listen("5000", function () {
  console.log(`server is running on the port `);
});

app.get("/", (req, res) => {
  res.sendFile("Static/index.html", { root: __dirname });
});

app.use(function (req, res) {
  // console.log("fullPath", fullPath);
  res.status(404).sendFile(path.join(__dirname, "./Static/404.html"));
});
