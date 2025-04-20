const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  name: { type: "string", min: 3, max: 255 },
  username: { type: "string", min: 3, max: 100 },
  email: { type: "email", min: 3, max: 100 },
  password: { type: "string", min: 5, max: 24 },
  confirmPassword: { type: "equal", field: "password" },
};

const check = v.compile(schema);

module.exports = check;
