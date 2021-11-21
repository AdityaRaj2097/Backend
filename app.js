// import { content } from "./Static/secret";
let content = require("./Static/secret");
const express = require("express");
const app = express();

//  By the help o fthis we get the data in json format
app.use(express.json());

const userRouter = express.Router();
app.use("/user", userRouter);
userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

function getUser(req, res) {
  res.send(content);
}

function postUser(req, res) {
  // console.log(req.body);
 
  let body = req.body;

  // users = req.body;
  content.push(body);
  res.json({
    message: "data received successfully",
    user: req.body,
  });
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
  res.send("hello world 2sss");
});
