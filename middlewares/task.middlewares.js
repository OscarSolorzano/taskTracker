const { Task } = require('../models/task.model');

const statusExists = (req, res, next) => {
  const { status } = req.params;
  if (
    !(
      status === 'active' ||
      status === 'completed' ||
      status === 'late' ||
      status === 'cancelled'
    )
  ) {
    return res.status(404).json({
      status: 'error',
      message: 'Status must be active, completed, late or cancelled',
    });
  }
  next();
};

const taskExistsAndIsActive = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id: id } });

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task does not exists',
      });
    }
    if (task.status != 'active') {
      return res.status(404).json({
        status: 'error',
        message: 'Task is not active',
      });
    }

    req.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { statusExists, taskExistsAndIsActive };
