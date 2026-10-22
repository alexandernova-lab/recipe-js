const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const UserController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User already exits with this email");
      }
      //   Salt
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      //   User Register
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      //   Generate Toke and Set cookie
      const token = generateToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      if (user) {
        res.status(201).json({ message: "User created", user, token });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = UserController;
