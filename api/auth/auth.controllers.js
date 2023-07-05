const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../db/models/User");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const createToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
  return token;
};

exports.register = async (req, res, next) => {
  try {
    console.log(req.body.isStaff);
    // overwrite and hash password
    const { password, confirmPass } = req.body;
    req.body.password = await hashPassword(password);

    // Password validation
    if (password !== confirmPass) {
      return res.status(403).json({ message: "Password doesn't match" });
    }

    // Create User
    const newUser = await User.create(req.body);

    // Create token
    const token = createToken(newUser);

    // return token
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.login = (req, res, next) => {
  const token = createToken(req.user);
  return res.status(200).json({ token });
};
