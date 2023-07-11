const { model, Schema } = require("mongoose");

const AuthSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "That username is taken."],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isStaff: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Auth", AuthSchema);
