const { default: mongoose } = require("mongoose");
const userCourseModel = require("../../models/userCourse");

exports.getAll = async (req, res) => {
  const orders = await userCourseModel
    .find({ user: req.user._id })
    .populate("course", "name href")
    .lean();

  return res.json(orders);
};

exports.getOne = async (req, res) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectId) {
    return res.status(409).json({ message: "The id is not valid" });
  }

  const order = await userCourseModel
    .findOne({ _id: req.params.id })
    .populate("course", "name href")
    .populate("user", "-password -role ");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json(order);
};
