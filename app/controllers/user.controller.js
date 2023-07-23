const User = require("../models/user.model");
const httpStatus = require("http-status");
const uuid = require("uuid");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await User.findOne({ uuid: req.params.uuid });
  if (!user)
    res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
  res.json(user);
};

const createUser = async (req, res) => {
  const user = new User({
    uuid: uuid.v4(),
    username: req.body.username,
    password: req.body.password,
  });
  const data = await user.save();
  if(!data) res.status(httpStatus.BAD_REQUEST).json({message: "Error while creating user"});
  res.json(data);
};

const updateUser = async (req, res) => {
  const user = await User.findOne({ uuid: req.params.uuid });
  if (req.body.username) {
    user.username = req.body.username;
  }
  if (req.body.password) {
    user.password = req.body.password;
  }
  const data = await user.save();
  res.json(data);
};

const deleteUser = async (req, res) => {
  const user = await User.findOne({ uuid: req.params.uuid });
  const data = await user.remove();
  res.json(data);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
