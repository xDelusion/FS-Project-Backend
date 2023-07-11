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
        ref: "Category",
      },
    ],
    ingredientId: String,
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Auth",
      },
    ],
    image: { type: String, required: false },
    steps: String,
  },
  { timestamps: true }
);

module.exports = model("Recipe", RecipeSchema);
