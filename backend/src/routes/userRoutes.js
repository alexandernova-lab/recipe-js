const express = require("express");
const UserController = require("../controllers/UserController");
const { userValidator } = require("../validators/UsersValidators");
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

router.post(
  "/register",
  userValidator,
  validateRequest,
  UserController.register,
);

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

module.exports = router;
