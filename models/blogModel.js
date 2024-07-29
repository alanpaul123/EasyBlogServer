const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  blogImg: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const blogs = mongoose.model("blogs", blogSchema);
module.exports = blogs;
