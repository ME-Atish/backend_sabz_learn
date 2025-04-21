const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../../models/user");
const registerResult = require("../../validators/register");

exports.getMe = async () => {
};

exports.register = async (req, res) => {
  const validationResult = registerResult(req.body);

  if (!validationResult) {
    return res.status(422).json(validationResult);
  }

  const { username, name, email, password, phone } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(409).json({
      message: "username or email is duplicated",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userModel.create({
    username,
    email,
    name,
    password,
    phone,
    role: "USER",
  });

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
    algorithm: "HS256",
  });

  return res.status(201).json({
    user,
    accessToken,
  });
};

exports.login = async () => {};
