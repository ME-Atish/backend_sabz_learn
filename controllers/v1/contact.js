const contactModel = require("../../models/contact");

exports.create = async (req, res) => {
  const { name, phone, email, body } = req.body;

  const contact = await contactModel.create({
    name,
    phone,
    email,
    body,
    isAnswer: 0,
  });

  if (!contact) {
    res.status(500).json({
      message: "An error given when try to create field",
    });
  }

  res.status(201).json(contact);
};
