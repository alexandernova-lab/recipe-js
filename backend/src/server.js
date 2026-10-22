const express = require("express");
const dotenv = require("dotenv");
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config({
  path: ".env",
});

const app = express();
app.use(express.json());
app.use(cookieParser());
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

app.use("/api/recipes", recipeRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
