const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/User");
const { JWT_SECRET, JWT_EXP } = require("../../config/keys");

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

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXP });
  return token;
};

exports.register = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.profileImage = `${req.file.path.replace("\\", "/")}`;
    }
    console.log(req.body.isStaff);

    // overwrite and hash password
    const { password, confirmPass } = req.body;
    req.body.password = await hashPassword(password);
    req.body.confirmPass = await hashPassword(confirmPass);

    // Password validation
    if (password !== confirmPass) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    // Create User
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

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
