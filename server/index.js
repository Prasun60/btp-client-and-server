const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace this with your actual frontend domain in production
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Specify the allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Specify the allowed request headers

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Aleesha2002:Aleesha2002@winter-project.5j1ztug.mongodb.net/crowdfunding?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  res.send("Server running");
});
const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

app.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User with the same username or email already exists",
      });
    } else {
      const isValidPassword = validatePassword(req.body.password);
      if (!isValidPassword) {
        return res.status(400).json({
          status: "fail",
          message:
            "Please provide a strong password with a minimum of 8 characters, including at least 1 letter, 1 number, and 1 special symbol.",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      //   const image = await cloudinary.uploader.upload(req.file.path);
      //   console.log(image);
      const newUser = new User({
        name: req.body.name,
        // userName: req.body.userName,
        email: req.body.email,
        // friends: [],
        password: hash,
        image: req.body.image,
      });
      console.log(newUser);
      await newUser.save();
      let token = "";
      if (newUser) {
        token = jwt.sign({ id: newUser._id }, "Crowdfunding");
        res.cookie("token", token);
      }
      res.status(200).json({
        status: "success",
        user: newUser,
        message: "User has been signed in!",
        token: token,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "fail",
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "Crowdfunding"
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    console.log("login success");
    res.cookie("token", token);
    res.status(200).json({
      status: "success",
      message: "User has been logged in!",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
