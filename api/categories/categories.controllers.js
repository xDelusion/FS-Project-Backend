const Category = require("../../db/models/Category");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("recipes");
    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    // if (!req.user.isStaff) {
    //   const err = new Error(
    //     "Only staff members are authorized to create a category"
    //   );
    //   err.status = 404;
    //   return next(err);
    // }

    const { name } = req.body;
    if (name == "") {
      return res.status(403).json({ message: "Field can't be empty" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};
