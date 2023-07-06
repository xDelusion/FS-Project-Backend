const { model, Schema } = require("mongoose");

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "That username is taken."],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPass: String,
    profileImage: String,
    isStaff: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("auth", authSchema);
