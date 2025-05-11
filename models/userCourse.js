const mongoose = require("mongoose");

const scheme = mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const model = mongoose.model("userCourse", scheme);

module.exports = model;
