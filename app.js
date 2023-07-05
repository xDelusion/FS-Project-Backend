// imports
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
require("dotenv").config();
const connectDB = require("./database");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorHandle = require("./middlewares/errorHandle");
const authRoutes = require("./api/auth/auth.routes");

// setup
const app = express();
connectDB();

// middlewares (before router)
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// routes
app.use("/api/auth", authRoutes);

// middlewares (after router)
app.use(notFound);
app.use(errorHandle);

// run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});
