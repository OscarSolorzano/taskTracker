//Model
const { User } = require('../models/user.model');

const userExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    //If user does not exist send error message
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    //If user exist pass it as a req param
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userExists };
