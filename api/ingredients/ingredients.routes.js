const express = require("express");
const router = express.Router();
const { recipeIngrediants } = require("./ingredients.controller");

router.get("/", recipeIngrediants);
module.exports = router;
