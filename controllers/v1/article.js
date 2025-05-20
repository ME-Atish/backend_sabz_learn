const articleModel = require("../../models/article");
const commentModel = require("../../models/comment");
const categoryModel = require("../../models/category");
const { default: mongoose, ConnectionStates } = require("mongoose");

exports.getAll = async (req, res) => {
  const getAllPublishedArticle = await articleModel.find({ publish: 1 });

  return res.json(getAllPublishedArticle);
};

exports.create = async (req, res) => {
  const { title, description, body, href, categoryId } = req.body;

  const createArticle = await articleModel.create({
    title,
    description,
    body,
    href,
    categoryId,
    cover: req.file.filename,
    creator: req.user,
    publish: 1,
  });

  const mainArticle = await articleModel
    .findById(createArticle._id)
    .populate("creator", "username email");

  return res.status(201).json(mainArticle);
};

exports.getOne = async (req, res) => {
  const { href } = req.params;

  const article = await articleModel
    .findOne({ href })
    .populate("creator", "username email")
    .populate("categoryId");

  if (!article) {
    return res.status(404).json({ message: "The article not found" });
  }

  const comments = await commentModel
    .find({ article: article._id, isAccept: 1 }, "-course")
    .populate("creator", "-password")
    .lean();

  let allComment = [];

  comments.forEach((comment) => {
    comments.forEach((answerComment) => {
      if (String(comment._id) == String(answerComment.mainCommentId)) {
        allComment.push({
          ...comment,
          article: comment.article.name,
          creator: comment.creator.name,
          answerComment,
        });
      }
    });
  });

  return res.json({
    article,
    comment: allComment,
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(409).json({ message: "The id is not valid" });
  }

  const deleteArticle = await articleModel.findByIdAndDelete({ _id: id });

  if (!deleteArticle) {
    return res.status(404).json({ message: "The article not found" });
  }

  return res.json(deleteArticle);
};

exports.draft = async (req, res) => {
  const { title, description, body, href, categoryId } = req.body;

  const draftedArticle = await articleModel.create({
    title,
    description,
    body,
    href,
    categoryId,
    cover: req.file.filename,
    creator: req.user,
    publish: 0,
  });

  res.status(201).json({ Message: "Article drafted successfully" });
};

exports.getAllDraft = async (req, res) => {
  const getDraftedArticle = await articleModel.find({ publish: 0 });

  return res.json(getDraftedArticle);
};

exports.getByCategory = async (req, res) => {
  const { category } = req.params;

  const findCategory = await categoryModel.findOne({ href: category });

  if (!findCategory) {
    return res.status(404).json({ message: "The category not found" });
  }

  const findArticleByCategory = await articleModel.find({
    categoryId: findCategory._id,
  });

  return res.json(findArticleByCategory);
};
