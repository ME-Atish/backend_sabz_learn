const ticketModel = require("./../../models/ticket");

exports.getAll = async (req, res) => {
  const tickets = await ticketModel
    .find({ answer: 0 })
    .populate("departmentId")
    .populate("subDepartmentId")
    .populate("User", -"password");

  return res.json(tickets);
};

exports.create = async (req, res) => {
  const { departmentId, subDepartmentId, priority, title, body, course } =
    req.body;

  const createTicket = await ticketModel.create({
    departmentId,
    subDepartmentId,
    priority,
    title,
    body,
    user: req.user._id,
    answer: 0,
    isAnswer: 0,
    course,
  });

  const mainTicket = await ticketModel
    .findOne({ _id: createTicket._id })
    .populate("departmentId", "title")
    .populate("subDepartmentId", "title")
    .populate("user", -"name")
    .lean();

  return res.status(201).json(mainTicket);
};

exports.userTicket = async (req, res) => {
  const getUserTicket = await ticketModel
    .find({ user: req.user._id })
    .sort({ id: -1 })
    .populate("departmentId")
    .populate("subDepartmentId")
    .populate("user", "name")
    .lean();

  return res.json(getUserTicket);
};

exports.getAnswer = async (req, res) => {
  const { id } = req.params;

  const ticket = await ticketModel.findOne({
    _id: id,
  });

  const answerTicket = await ticketModel.findOne({
    parent: id,
  });

  return res.json({ ticket, answerTicket: answerTicket ? answerTicket : null });
};

exports.setAnswer = async (req, res) => {
  const { body, ticketId } = req.body;

  const ticket = await ticketModel.findOne({ _id: ticketId });

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  const answer = await ticketModel.create({
    title: "پاسخ تیکت شما",
    body,
    parent: ticketId,
    priority: ticket.priority,
    user: req.user._id,
    isAnswer: 1,
    answer: 0,
    departmentId: ticket.departmentId,
    subDepartmentId: ticket.subDepartmentId,
  });

  await ticketModel.findOneAndUpdate(
    {
      _id: ticketId,
    },
    {
      answer: 1,
    }
  );

  res.status(201).json(answer);
};
