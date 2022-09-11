const express = require('express');

//Controllers
const {
  getAllTasks,
  createTask,
  getTasksByStatus,
  updateTask,
  cancelTask,
} = require('../controllers/tasks.controller');

//Middleware
const {
  createTaskValidator,
} = require('../middlewares/validators.middlewares');
const {
  statusExists,
  taskExistsAndIsActive,
} = require('../middlewares/task.middlewares');

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.get('/:status', statusExists, getTasksByStatus);

tasksRouter.post('/', createTaskValidator, createTask);

tasksRouter.patch('/:id', taskExistsAndIsActive, updateTask);

tasksRouter.delete('/:id', taskExistsAndIsActive, cancelTask);

module.exports = { tasksRouter };
