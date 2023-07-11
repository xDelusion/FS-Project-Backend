const Category = require("../../db/models/Category");
const Recipe = require("../../db/models/Recipe");

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate("categoryId");
    return res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

exports.addRecipe = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Only members are authorized to create a recipe",
      });
    }

    if (req.file) {
      req.body.image = `${req.file.path.replace("\\", "/")}`;
    }

    const { name } = req.body;
    if (name == "") {
      return res.status(403).json({ message: "Field can't be empty" });
    }

    const existingRecipe = await Recipe.findOne({ name });
    if (existingRecipe) {
      return res.status(400).json({ message: "Recipe already exists" });
    }

    const category = await Category.findById(req.body.categoryId);

    const recipe = await Recipe.create({
      name: req.body.name,
      categoryId: req.body.categoryId,
      ingredients: req.body.ingredients,
      image: req.body.image,
      steps: req.body.steps,
      userId: req.user._id,
    });

    category.recipes = [...category.recipes, recipe._id];

    await category.save();
    return res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

exports.deleteRecipe = async (recipeId) => {
  try {
    const { data } = await instance.delete(`/recipes/${recipeId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

exports.recipeEdit = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const categoryId = req.body.categoryId;

    let category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const isRecipeExist = category.recipes.includes(recipe._id);
    if (isRecipeExist) {
      return res
        .status(400)
        .json({ message: "Recipe already added to the category" });
    }
    // genre.name = req.body.name;
    recipe.categoryId = [...recipe.categoryId, categoryId];

    category.recipes = [...category.recipes, recipeId];

    await recipe.save();
    await category.save();

    return res.status(201).json(recipe);
  } catch (error) {
    return next(error);
  }
};
