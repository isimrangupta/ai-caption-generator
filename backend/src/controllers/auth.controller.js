const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

 res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "User created successfully",
      token,
      user,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
}


async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
}


module.exports = {
  registerController,
  loginController,
}