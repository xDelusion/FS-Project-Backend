const express = require("express");
const router = express.Router();
const uploader = require("../../middlewares/uploader");
const { register, login } = require("./auth.controllers");
const passport = require("passport");

router.post("/register", uploader.single("profileImage"), register);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

module.exports = router;
