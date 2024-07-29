const blogs = require("../models/blogModel");

//add blogs
exports.addBlogController = async (req, res) => {
  console.log("Inside add Blog Function");
  const { type, date, title, authorName, content } = req.body;
  const userId = req.payload;
  const blogImg = req.file.filename;

  console.log(type, date, title, authorName, content, userId, blogImg);

  try {
    const existingBlog = await blogs.findOne({ title });
    if (existingBlog) {
      res
        .status(406)
        .json("Project aldready in our database... Add Another one");
    } else {
      const newBlog = new blogs({
        type,
        date,
        title,
        authorName,
        content,
        blogImg,
        userId,
      });
      await newBlog.save();
      res.status(200).json(newBlog);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// home blogs

exports.getHomeBlogs = async (req, res) => {
  console.log("Inside get Home Blogs");
  try {
    const homeBlogs = await blogs.find().limit(3);
    res.status(200).json(homeBlogs);
  } catch (err) {
    res.status(401).json(err);
  }
};

// All Projects

exports.allBlogsController = async (req, res) => {
  console.log("Inside all the blogs");
  const searchKey = req.query.search;
  const query = {
    type: {
      $regex: searchKey,
      $options: "i",
    },
  };
  try {
    const allBlogs = await blogs.find(query);
    res.status(200).json(allBlogs);
  } catch (err) {
    res.status(401).json(err);
  }
};

// Get user Projects

exports.getUserBlogsController = async (req, res) => {
  console.log("Inside getUserBlogController");
  const userId = req.payload;
  try {
    const allBlogs = await blogs.find({ userId });
    res.status(200).json(allBlogs);
  } catch (err) {
    res.status(401).json(err);
  }
};

// edit Blogs

exports.editBlogController = async (req, res) => {
  console.log("Inside editBlogController");
  const { pid } = req.params;
  const { type, date, title, authorName, content, blogImg } = req.body;
  const uploadImg = req.file ? req.file.filename : blogImg;
  const userId = req.payload;
  try {
    const updatedBlog = await blogs.findByIdAndUpdate(
      { _id: pid },
      {
        type,
        date,
        title,
        authorName,
        content,
        blogImg: uploadImg,
        userId,
      },
      { new: true }
    );
    await updatedBlog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(401).json(err);
  }
};

// Remove Project
exports.removeBlogController = async (req, res) => {
  console.log("Inside removeBlogController");
  const { pid } = req.params;
  try {
    const removedBlog = await blogs.findByIdAndDelete({ _id: pid });
    res.status(200).json(removedBlog);
  } catch (err) {
    res.status(401).json(err);
  }
};
