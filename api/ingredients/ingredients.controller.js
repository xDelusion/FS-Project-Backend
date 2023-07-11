const Ingredient = require("../../db/models/Ingredient");
const Recipe = require("../../db/models/Recipe");

exports.recipeIngredients = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Category not found" });
    }
    const ingredients = await recipe.ingredientId();
    res.status(204).json(recipe, ingredients);
  } catch (err) {
    next(err);
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name == "") {
      return res.status(403).json({ message: "Not authenticated user" });
    }

    const ingredient = await Ingredient.create({ name });
    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
};
