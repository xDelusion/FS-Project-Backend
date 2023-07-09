const { model, Schema } = require("mongoose");

const recipeSchema = new Schema(
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
    image: String,
    steps: String,
  },
  { timestamps: true }
);

module.exports = model("recipe", recipeSchema);
