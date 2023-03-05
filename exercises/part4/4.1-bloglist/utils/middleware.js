const logger = require("./logger");

const morgan = require("morgan");
const requestLogger = morgan("tiny");

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
