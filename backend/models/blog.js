const mongoose = require("mongoose");

const logger = require("../utils/logger.js");
const config = require("../utils/config.js");

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

logger.info("connecting to", url);

mongoose
  .connect(url)
  .then((res) => {
    logger.info("connected to MongoDB");
  })
  .catch((err) => {
    logger.error("error connecting to MongoDB", err.message);
  });

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  url: {
    type: String,
    default: null,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
