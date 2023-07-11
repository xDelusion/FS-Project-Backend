const { model, Schema } = require("mongoose");
const { schema } = require("./User");

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    recipeId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Ingredient", ingredientSchema);
