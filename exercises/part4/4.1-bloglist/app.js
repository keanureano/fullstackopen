const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to mongoDB:", error.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

module.exports = app;


// require("dotenv").config();

// const http = require("http");
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const morgan = require("morgan");

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
// });

// const Blog = mongoose.model("Blog", blogSchema);

// mongoose.set("strictQuery", false);
// console.log("connecting to", process.env.MONGODB_URI);
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("connected to mongoDB");
//   })
//   .catch((error) => {
//     console.error("error connecting to mongoDB:", error.message);
//   });

// app.use(cors());
// app.use(express.json());
// app.use(morgan("tiny"));