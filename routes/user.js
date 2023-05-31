const { getAllUsers,getUserById,UpdateUser,UpdateUserPassword,getCurrentUser } = require("../controllers/user");
const { authMiddleware, authorizeRoles } = require("../middlewares/auth");

const userRouter = require("express").Router();

userRouter.route("/").get(authorizeRoles("admin"),getAllUsers);
userRouter.route("/me").get(getCurrentUser);
userRouter.route("/update").patch(UpdateUser);
userRouter.route("/update/password").patch(UpdateUserPassword);
userRouter.route("/:id").get(getUserById)


module.exports = userRouter;