//Model
const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: { model: User, attributes: ['id', 'name'] },
    });

    res.status(200).json({
      status: 'succes',
      data: { tasks },
    });
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { userId, title, startDate, limitDate } = req.body;
    const newTask = await Task.create({ userId, title, startDate, limitDate });

    res.status(201).json({
      status: 'succes',
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    console.log(status);
    const tasks = await Task.findAll({
      where: { status },
      include: { model: User, attributes: ['id', 'name'] },
    });

    res.status(200).json({
      status: 'succes',
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { task } = req;

    const fDate = new Date(finishDate);
    const lDate = new Date(task.limitDate);

    if (fDate <= lDate) {
      await task.update({ finishDate, status: 'completed' });
    } else {
      await task.update({ finishDate, status: 'late' });
    }
    res.status(200).json({
      status: 'succes',
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

const cancelTask = async (req, res) => {
  try {
    const { task } = req;
    task.update({ status: 'cancelled' });

    res.status(204).json({
      status: 'succes',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTasksByStatus,
  updateTask,
  cancelTask,
};
