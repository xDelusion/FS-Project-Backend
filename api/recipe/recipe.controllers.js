const Recipe = require("../../db/models/Recipe");

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
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

    const recipe = await Recipe.create({
      name: req.body.name,
      categoryId: req.body.categoryId,
      ingredients: req.body.ingredients,
      image: req.body.image,
      steps: req.body.steps,
      userId: req.user._id,
    });
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};
