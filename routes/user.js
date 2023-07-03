const express = require("express");

const {
  signInController,
  signUpController,
  verifyController,
} = require("../controllers/user");

const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/signup", signUpController);

userRouter.post("/signin", signInController);

userRouter.post("/verify", auth, verifyController);

module.exports = userRouter;
