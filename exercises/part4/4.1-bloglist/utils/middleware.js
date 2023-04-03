const logger = require("./logger");

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformed id" });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: error.message });
  } else {
    logger.error(error.message);
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get("Authorization");
  if (auth && auth.startsWith("Bearer ")) {
    req.token = auth.replace("Bearer ", "");
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
