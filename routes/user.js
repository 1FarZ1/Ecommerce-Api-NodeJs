
const userRouter = require("express").Router();

userRouter.route("/").get();


module.exports = userRouter;