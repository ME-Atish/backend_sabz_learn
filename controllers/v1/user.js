const userModel = require("../../models/user");
const banUserModel = require("../../models/banPhone");

const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcrypt");

exports.banUser = async (req, res) => {
  const mainUser = await userModel.findOne({ _id: req.params.id }).lean();
  const banUserResult = await banUserModel.create({ phone: mainUser.phone });

  if (!banUserResult) {
    return res.status(500).json({ message: "Server Error" });
  }

  return res.status(200).json({ message: "User ban successfully" });
};

exports.getAll = async (req, res) => {
  const users = await userModel.find({});

  return res.json(users);
};

exports.removeUser = async (req, res) => {
  const isValidUserId = isValidObjectId(req.params.id);

  if (!isValidUserId) {
    return res.status(409).json({ message: "User Id is not valid" });
  }

  const removeUser = await userModel.findByIdAndDelete({ _id: req.params.id });

  if (!removeUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(201).json({ message: "User delete successfully" });
};

exports.changeRole = async (req, res) => {
  const id = req.body.id;
  const isValidUserId = isValidObjectId(id);

  if (!isValidUserId) {
    return res.status(409).json({ message: "User Id is not valid" });
  }

  const user = await userModel.findOne({ _id: id });

  let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

  const updatedUser = await userModel.findByIdAndUpdate(
    { _id: id },
    {
      role: newRole,
    }
  );

  if (!updatedUser) {
    return res.status(500).json({ message: "Got error in updated user" });
  }

  return res.status(201).json({ message: "User's role changed successfully" });
};

exports.updateUser = async (req, res) => {
  const { username, name, email, password, phone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel
    .findByIdAndUpdate(
      { _id: req.user._id },
      {
        name,
        username,
        password: hashedPassword,
        email,
        phone,
      }
    )
    .select("-password");

  if (!user) {
    return res
      .status(500)
      .json({ message: "Got error in update user information" });
  }

  return res.status(201).json(user);
};
