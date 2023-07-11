const express = require("express");
const router = express.Router();
const passport = require("passport");
const uploader = require("../../middlewares/uploader");
const { getRecipes, addRecipe } = require("./recipe.controllers");

router.get("/", getRecipes);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploader.single("image"),
  addRecipe
);

module.exports = router;
