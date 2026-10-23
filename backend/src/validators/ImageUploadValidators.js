const { body } = require("express-validator");

const imageValidator = [
  body("image").custom((value, { req }) => {
    const file = req.file;

    if (!file) throw new Error("Image is required");

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      throw new Error("Only JPG, PNG and WEBP images are allowed");
    }

    if (file.size > 2 * 1024 * 1024) {
      throw new Error("Image must be under 2MB");
    }

    return true;
  }),
];

module.exports = { imageValidator };
