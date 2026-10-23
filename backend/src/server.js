const express = require("express");
const dotenv = require("dotenv");
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const protect = require("./middlewares/authMiddleware");
const sendEmail = require("./utils/sendEmail");

dotenv.config({
  path: ".env",
});

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// Ejs Setup
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Database
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl).then(() => {
  console.log("DB Connect success");
});

const PORT = process.env.PORT;

app.use("/api/recipes", protect, recipeRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

app.get("/send-email", (req, res) => {
  sendEmail({
    view: "email",
    data: {
      name: "AungAung",
    },
    from: "mgmg@gmail.com",
    to: "aungaung@gmail.com",
    subject: "Hello AungAung",
  });
  return res.send("email already sent");
});
