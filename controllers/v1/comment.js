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
