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

module.exports = router;
