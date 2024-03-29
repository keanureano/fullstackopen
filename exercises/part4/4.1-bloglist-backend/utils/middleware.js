const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: error.message });
  } else {
    logger.error(error.message);
  }
  next(error);
};

const userExtractor = async (req, res, next) => {
  const auth = req.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "token missing" });
  }
  const token = auth.replace("Bearer ", "");

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "user not found" });
  }
  
  req.user = user.id.toString();
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
