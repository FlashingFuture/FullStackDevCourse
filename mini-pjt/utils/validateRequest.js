const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(422).json(err.array());
  }
  next();
};

module.exports = validateRequest;
