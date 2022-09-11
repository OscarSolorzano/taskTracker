//Models

const { Task } = require('./task.model');
const { User } = require('./user.model');

const initModels = () => {
  //1 User <--> M Task
  User.hasMany(Task, { foreignKey: 'userId' });
  Task.belongsTo(User);
};

module.exports = { initModels };
