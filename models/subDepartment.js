const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: "department",
    required: true,
  },
});

const model = mongoose.model("subDepartment", schema);

module.exports = model;
