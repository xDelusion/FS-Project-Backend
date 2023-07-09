const Category = require("../../db/models/Category");

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  return res.status(200).json(categories);
};
