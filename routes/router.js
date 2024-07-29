const express = require("express");

const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");
const router = new express.Router();

// Register
router.post("/register", userController.registerController);

// login
router.post("/login", userController.loginController);

// add blogs
router.post( "/blog/add", jwtMiddleware,multerMiddleware.single("blogImg"),blogController.addBlogController
);

// Home Blogs
router.get("/get-home-blogs", blogController.getHomeBlogs);

// All the blogs
router.get("/all-blogs", jwtMiddleware, blogController.allBlogsController);

// User Projects
router.get("/user-blogs", jwtMiddleware, blogController.getUserBlogsController);

// edit blog
router.put( "/blog/:pid/edit", jwtMiddleware,multerMiddleware.single("blogImg"),blogController.editBlogController
);

// remove project
router.delete("/blog/:pid/remove",jwtMiddleware,blogController.removeBlogController)
module.exports = router;
