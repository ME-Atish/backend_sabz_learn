const { default: mongoose } = require("mongoose");
const commentModel = require("../../models/comment");
const courseModel = require("../../models/course");

exports.create = async (req, res) => {
  const { body, courseHref, score } = req.body;

  const course = await courseModel.findOne({ href: courseHref });

  if (!course) {
    res.status(404).json({ message: "There is not course!" });
  }

  const comment = await commentModel.create({
    body,
    course: course._id,
    creator: req.user._id,
    score,
    isAnswer: 0,
    isAccept: 0,
  });

  return res.status(201).json({ comment });
};

exports.delete = async (req, res) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectId) {
    return res.status(409).json({
      message: "The id is not valid",
    });
  }

  const deletedComment = await commentModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedComment) {
    res.status(404).json({ message: "The comment not found" });
  }

  return res.status(200).json(deletedComment);
};
