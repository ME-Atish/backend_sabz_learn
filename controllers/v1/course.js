const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");

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

  return res.json({session, sessions});
};
