const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

//create a user
const createUser = asyncHandler(async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  })
  
  
  //get all users
  const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  })
  
  
  //get a user by id
  const getUserById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Can not find any user by id ' + id });
      }
      
      res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  })
  
  
  //update a user by id
  const updateUserById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body);
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Can not find any user by id ' + id });
      }
  
      const updatedUser = await User.findById(id);
      res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  })
  
  
  //delete a user
  const removeUserById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Can not find any user by id ' + id });
      }
      res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  })


  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    removeUserById,
}