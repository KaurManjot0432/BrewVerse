const { body } = require('express-validator')

export const validateUser = [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
];

export const validateSignin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank!').isLength({ min: 1 })
];

export const validateReview = [
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
  ];