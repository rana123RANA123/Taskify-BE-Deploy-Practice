const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userController } = require('../../controllers');
const { userValidation } = require('../../validations');
const router = express.Router();

router
  .route('/')
  .post(
    auth('manageUsers'),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(userController.getUsers);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);
module.exports = router;
