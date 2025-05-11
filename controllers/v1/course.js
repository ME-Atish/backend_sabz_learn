const { isValidObjectId } = require("mongoose");

const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");
const userCourseModel = require("../../models/userCourse")

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
