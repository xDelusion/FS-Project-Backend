const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categoryId: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    ingredients: String,
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "auth",
      },
    ],
    image: { type: String, required: true },
    steps: String,
  },
  { timestamps: true }
);

module.exports = model("Recipe", RecipeSchema);
