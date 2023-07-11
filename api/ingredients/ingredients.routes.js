const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getIngredients,
  createIngredient,
} = require("./ingredients.controller");

router.get("/", getIngredients);
router.post(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  createIngredient
);

module.exports = router;
