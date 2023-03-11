const logger = require("./logger");

const morgan = require("morgan");
const requestLogger = morgan("tiny");

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ error: error.message });
  } else {
    logger.error(error.message);
  }
  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
