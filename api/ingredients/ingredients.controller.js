const Ingredient = require("../../db/models/Ingredient");
const Recipe = require("../../db/models/Recipe");

exports.recipeIngrediants = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "category not found" });
    }
    const ingredients = await recipe.ingredientId();
    res.status(204).json(recipe, ingredients);
  } catch (err) {
    next(err);
  }
};
