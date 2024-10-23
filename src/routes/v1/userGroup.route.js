const express = require('express');
const usergroupController = require('../../controllers/userGroups.controller');
const agencyMiddleware = require('../../middlewares/agency');
const validate = require('../../middlewares/validate');
const userGroupValidation = require('../../validations/userGroup.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(userGroupValidation.createUsergroup), agencyMiddleware, usergroupController.createUserGroup)
  .get(agencyMiddleware, usergroupController.getUserGroups);

router
  .route('/:userGroupId')
  .get(agencyMiddleware, usergroupController.getUserGroup)
  .patch(validate(userGroupValidation.updateUsergroup), agencyMiddleware, usergroupController.updateUserGroup)
  .delete(validate(userGroupValidation.deleteUsergroup), agencyMiddleware, usergroupController.deleteUserGroup);

module.exports = router;
