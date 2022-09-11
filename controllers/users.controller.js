//Models
const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'active' },
      include: Task,
    });

    res.status(200).json({
      status: 'succes',
      data: { users },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      status: 'succes',
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({ name, email });

    res.status(200).json({
      status: 'succes',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    user.update({ status: 'deleted' });

    res.status(204).json({
      status: 'succes',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
