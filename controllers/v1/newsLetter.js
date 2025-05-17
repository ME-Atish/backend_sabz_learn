const newsLetterModel = require("../../models/newsletter");

exports.getAll = async (req, res) => {
  const newsLetter = await newsLetterModel.find({});
  return res.json(newsLetter);
};

exports.create = async (req, res) => {
  const { email } = req.body;

  const isRegisteredEmail = await newsLetterModel.findOne({ email });

  if (!!isRegisteredEmail) {
    return res.status(400).json({
      message: "This email has been registered",
    });
  }

  const newsLetter = await newsLetterModel.create({
    email,
  });

  return res.status(201).json(newsLetter);
};
