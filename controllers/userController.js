const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register login
exports.registerController = async (req, res) => {
  console.log("Inside register Function");
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    // Emal is in mongo Db
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      // aldready a user
      res.status(406).json("Account aldready exists!!! Please Login in");
    } else {
      // register user: create object for your model
      const newUser = new users({
        username,
        email,
        password,
      });

      //   update mogodb from model

      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// login
exports.loginController = async (req, res) => {
  console.log("Indide Login Function");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_PASSWORD
      );

      res.status(200).json({
        user: existingUser,
        token,
      });
    } else {
      res.status(404).json("Invalid Email / Password");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};


