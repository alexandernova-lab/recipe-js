const express = require("express");
const dotenv = require("dotenv");
const recipeRoutes = require("./routes/recipeRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({
  path: ".env",
});

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

// Database
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl).then(() => {
  console.log("DB Connect success");
});

const PORT = process.env.PORT;

app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
