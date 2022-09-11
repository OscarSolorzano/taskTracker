const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((err) => err.msg);

    const message = errorMessage.join('. ');
    return res.status(404).json({
      status: 'error',
      message,
    });
  }
  next();
};

const createUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name must not be empty')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters Long'),
  body('email').isEmail().withMessage('Must enter a valid email'),
  body('password')
    .isString()
    .withMessage('Passsword must be a string')
    .notEmpty()
    .withMessage('Password must not be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  checkValidations,
];

const createTaskValidator = [
  body('userId')
    .isInt()
    .withMessage('User Id must be an integer')
    .notEmpty()
    .withMessage('User Id must not be empty'),
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title must not be empty')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('startDate')
    .isISO8601()
    .withMessage('The start date must be “YYYY-MM-DD HH:mm:ss”')
    .notEmpty()
    .withMessage('The start date must not be empty'),
  body('limitDate')
    .isISO8601()
    .withMessage('The limit date must be a “YYYY-MM-DD HH:mm:ss”')
    .notEmpty()
    .withMessage('The limit date must not be empty'),
  checkValidations,
];

module.exports = { createUserValidators, createTaskValidator };
