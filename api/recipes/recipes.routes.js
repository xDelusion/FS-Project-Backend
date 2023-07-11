const express = require("express");
const router = express.Router();
const passport = require("passport");
const uploader = require("../../middlewares/uploader");
const {
  getRecipes,
  addRecipe,
  deleteRecipe,
  recipeEdit,
} = require("./recipes.controllers");

router.get("/", getRecipes);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploader.single("image"),
  addRecipe
);
router.delete("/:recipeId", deleteRecipe);
router.put(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  recipeEdit
);
module.exports = router;
