const { model, Schema } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    recipes: [{ type: Schema.Types.ObjectId, ref: "recipe" }],
  },
  { timestamps: true }
);

module.exports = model("Category", CategorySchema);
