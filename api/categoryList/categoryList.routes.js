const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getCategories, createCategory } = require("./categoryList.controllers");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getCategories
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

module.exports = router;
