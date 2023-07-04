// imports
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./database");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorHandle = require("./middlewares/errorHandle");

// setup
const app = express();
connectDB();

// middlewares (before router)
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// routes

// middlewares (after router)
app.use(notFound);
app.use(errorHandle);

// run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});
