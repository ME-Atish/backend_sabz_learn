const { default: mongoose, ModifiedPathsSnapshot } = require("mongoose");
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

exports.accept = async (req, res) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectId) {
    return res.status(409).json({ message: "The id is not valid" });
  }

  const acceptComment = await commentModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      isAccept: 1,
    }
  );

  if (!acceptComment) {
    return res.status(404).json({ message: "The course not found" });
  }

  return res.json({ message: "The comment was accepted successfully" });
};

exports.reject = async (req, res) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectId) {
    return res.status(409).json({ message: "The id is not valid" });
  }

  const rejectComment = await commentModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      isAccept: 0,
    }
  );

  if (!rejectComment) {
    res.status(404).json({ message: "The comment not found" });
  }

  return res.json({ message: "The comment was rejected successfully" });
};

exports.answer = async (req, res) => {
  const { body } = req.body;
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectId) {
    return res.status(409).json({ message: "The id is not valid" });
  }

  const acceptedComment = await commentModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      isAccept: 1,
      isAnswer: 1,
    }
  );

  if (!acceptedComment) {
    res.status(404).json({
      message: "The comment not found",
    });
  }

  const answerComment = await commentModel.create({
    body,
    course: acceptedComment.course,
    creator: req.user._id,
    isAnswer: 1,
    isAccept: 1,
    mainCommentId: req.params.id,
  });

  res.status(201).json(answerComment);
};
