const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  recipeIngredients,
  createIngredient,
} = require("./ingredients.controller");

router.get("/", recipeIngredients);
router.post(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  createIngredient
);

module.exports = router;
