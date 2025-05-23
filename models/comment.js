const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    article: {
      type: mongoose.Types.ObjectId,
      ref: "article"
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAccept: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 5,
    },
    isAnswer: {
      type: Number,
      required: true,
    },
    mainCommentId: {
      type: mongoose.Types.ObjectId,
      ref: "comment.js",
    },
  },
  {
    timestamp: true,
  }
);

const model = mongoose.model("comment", schema);

module.exports = model;
