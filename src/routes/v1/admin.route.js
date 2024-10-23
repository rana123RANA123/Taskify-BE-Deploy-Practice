const express = require('express');
const validate = require('../../middlewares/validate');
const adminController = require('../../controllers/admin.controller');
const userController = require('../../controllers/user.controller');
const adminValidation = require('../../validations/admin.validation');
const userValidation = require('../../validations/user.validation');

const router = express.Router();

// Admin Auth //
router.post('/login', validate(adminValidation.login), adminController.login);

// Agency Routes  //
// To Do: Add Access Levels
router
  .route('/agency')
  .get(validate(adminValidation.getAgencies), adminController.getAgencies)
  .post(validate(adminValidation.createAgency), adminController.createAgency);

router
  .route('/agency/:agencyId')
  .patch(validate(adminValidation.updateAgency), adminController.updateAgency)
  .delete(validate(adminValidation.deleteAgency), adminController.deleteAgency);

// User Routes  //
router
  .route('/users')
  .post(validate(adminValidation.createUser), userController.createUser)
  .get(validate(userValidation.getUsers), userController.getUsers);

router
  .route('/users/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
