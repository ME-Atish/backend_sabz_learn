const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const model = mongoose.model("newsLetter" ,schema );

module.exports = model;
