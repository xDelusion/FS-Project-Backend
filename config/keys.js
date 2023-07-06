require("dotenv").config();

module.exports = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP: process.env.JWT_EXP,
};
