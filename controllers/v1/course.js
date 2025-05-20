const { isValidObjectId, default: mongoose } = require("mongoose");

const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");
const userCourseModel = require("../../models/userCourse");
const categoryModel = require("../../models/category");
const commentModel = require("../../models/comment");

exports.create = async (req, res) => {
  const {
    name,
    description,
    support,
    href,
    price,
    status,
    discount,
    categoryId,
  } = req.body;

  const course = await courseModel.create({
    name,
    description,
    creator: req.user._id,
    categoryId,
    support,
    price,
    href,
    status,
    discount,
    cover: req.file.filename,
  });

  const mainCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json(mainCourse);
};

exports.createSession = async (req, res) => {
  const { title, time, free } = req.body;
  const { id } = req.params;
  const session = await sessionModel.create({
    title,
    time,
    free,
    video: "video.mp4",
    course: id,
  });

  return res.status(201).json(session);
};

exports.getAllSession = async (req, res) => {
  const session = await sessionModel.find({}).populate("course", "name").lean();

  return res.json(session);
};

exports.getSessionInfo = async (req, res) => {
  const course = await courseModel.findOne({ href: req.params.href });

  const session = await sessionModel.findOne({ _id: req.params.sessionId });

  const sessions = await sessionModel.find({ course: course._id });

  return res.json({ session, sessions });
};

exports.deleteSession = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(406).json({ message: "The id is not valid" });
  }
  const deletedCourse = await sessionModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedCourse) {
    return res.status(404).json({ message: "The session not found" });
  }

  return res.json({ deletedCourse });
};

exports.register = async (req, res) => {
  const { price } = req.body;

  const isUserAlreadyRegistered = await userCourseModel.findOne({
    user: req.user._id,
  });

  if (isUserAlreadyRegistered) {
    return res
      .status(409)
      .json({ message: "The user already registered on this course" });
  }

  const register = await userCourseModel.create({
    course: req.params.id,
    user: req.user._id,
    price,
  });

  return res
    .status(201)
    .json({ message: "The user successfully registered on the course" });
};

exports.getCategory = async (req, res) => {
  const { href } = req.params;

  const category = await categoryModel.findOne({ href });

  if (category) {
    const categoryCourse = await courseModel.find({ categoryId: category._id });
    return res.json(categoryCourse);
  } else {
    return res.json([]);
  }
};

exports.getOne = async (req, res) => {
  const course = await courseModel
    .findOne({ href: req.params.href })
    .populate("creator", "-password")
    .populate("categoryId");

  if (!course) {
    return res
      .status(404)
      .json({ message: "We don't have such a course at the moment." });
  }

  const sessions = await sessionModel.find({ course: course._id });
  const comments = await commentModel
    .find({ course: course._id, isAccept: 1 } , "-article")
    .populate("creator", "-password")
    .lean();

  const courseStudentCount = await userCourseModel
    .find({ course: course._id })
    .countDocuments();

  const isUserRegisterToThisCourse = !!(await userCourseModel.findOne({
    user: req.user._id,
    course: course._id,
  }));

  let allComment = [];

  comments.forEach((comment) => {
    comments.forEach((answerComment) => {
      if (String(comment._id) == String(answerComment.mainCommentId)) {
        allComment.push({
          ...comment,
          course: comment.course.name,
          creator: comment.creator.name,
          answerComment,
        });
      }
    });
  });

  res.json({
    course,
    sessions,
    comments: allComment,
    isUserRegisterToThisCourse,
    courseStudentCount,
  });
};

exports.deleteCourse = async (req, res) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidObjectId) {
    return res.status(409).json({
      message: "The id is not valid",
    });
  }

  const deletedCourse = await courseModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedCourse) {
    return res.status(404).json({
      message: "The course not found",
    });
  }

  return res.json({
    deletedCourse,
  });
};

exports.getRelated = async (req, res) => {
  const { href } = req.params;

  const course = await courseModel.findOne({ href });

  if (!course) {
    res.status(404).json({ message: "The course not found" });
  }

  let relatedCourses = await courseModel.find({
    categoryId: course.categoryId,
  });

  relatedCourses = relatedCourses.filter((course) => course.href !== href);

  return res.json(relatedCourses);
};

exports.popular = async (req, res) => {
  const course = await courseModel
    .find({score: {$gte: 3}})
    .populate("creator", "-password")
    .populate("categoryId");

  res.json(course)

};

exports.presell = async (req, res) => {
  const course = await courseModel.find({status: "presell"})
  res.json(course)
};
