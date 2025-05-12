const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    support: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

schema.virtual("session", {
  ref: "session",
  localField: "_id",
  foreignField: "course",
});
schema.virtual("comment", {
  ref: "comment",
  localField: "_id",
  foreignField: "course",
});

const model = mongoose.model("course", schema);

module.exports = model;
