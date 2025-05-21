const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Types.ObjectId,
      ref: "department",
      required: true,
    },
    subDepartmentId: {
      type: mongoose.Types.ObjectId,
      ref: "subDepartment",
      required: true,
    },
    priority: {
      type: Number, // 1 , 2 , 3
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answer: {
      type: Number, // 0 , 1
      required: true,
    },
    isAnswer: {
      type: Number,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: false,
    },
  },
  { timestamp: true }
);

const model = mongoose.model("ticket", schema);

module.exports = model;
