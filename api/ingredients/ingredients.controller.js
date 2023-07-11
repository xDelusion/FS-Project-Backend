const Ingredient = require("../../db/models/Ingredient");

exports.getIngredients = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.find();

    res.status(200).json(ingredient);
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
