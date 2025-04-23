const userModel = require("../../models/user");
const banUserModel = require("../../models/banPhone");
const { isValidObjectId } = require("mongoose");

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
