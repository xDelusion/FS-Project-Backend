const Category = require("../../db/models/Category");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      const err = new Error(
        "Only staff members are authorized to create a category"
      );
      err.status = 404;
      return next(err);
    }
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};
