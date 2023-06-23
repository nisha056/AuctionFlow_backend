const express = require("express");
const userRouter = express.Router();
const {
  signup,
  viewuser,
  login,
  verifytoken,
} = require("../controllers/userController");

userRouter.route("/").get(viewuser);
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/verifytoken").post(verifytoken);
module.exports = userRouter;
