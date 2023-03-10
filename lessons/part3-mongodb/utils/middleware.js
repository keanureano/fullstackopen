const logger = require("./logger");
const morgan = require("morgan");
const requestLogger = morgan("tiny");

// const requestLogger = (request, response, next) => {
//   logger.info("Method:", request.method);
//   logger.info("Path:  ", request.path);
//   logger.info("Body:  ", request.body);
//   logger.info("---");
//   next();
// };

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
