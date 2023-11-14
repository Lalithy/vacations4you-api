const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//get a user by id
const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Can not find any user by id " + id });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//create a user
const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, status, email, password, user_role } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const body = await User.create({
      name,
      status,
      email,
      password: hashedPassword,
      user_role,
    });
    const user = await User.create(body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//update a user by id
const updateUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Can not find any user by id " + id });
    }

    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//delete a user
const removeUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Can not find any user by id " + id });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//password reset
const resetUserpassword = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const body = { password: hashedPassword };
    const user = await User.findByIdAndUpdate(id, body);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Can not find any user by id " + id });
    }

    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// user signup
const signup = asyncHandler(async (req, res) => {
  try {
    const { name, status, email, password, user_role } = req.body;

    if (!(name && email && password && user_role)) {
      res.status(400).json({ message: "Fields cannot be empty!" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name,
      status: true,
      email,
      password: hashedPassword,
      user_role,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// user login
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ message: "Email and Password are required " });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if (existingUser && matchPassword) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        SECRET_KEY
      );
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        existingUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  removeUserById,
  resetUserpassword,
  signup,
  login,
};
