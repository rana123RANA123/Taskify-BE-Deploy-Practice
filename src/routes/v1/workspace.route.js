const express = require('express');
const validate = require('../../middlewares/validate');
const { workspaceController } = require('../../controllers');
const { workspaceValidation } = require('../../validations');
const authId = require('../../middlewares/authId');

const router = express.Router();

router
  .route('/')
  .post(
    validate(workspaceValidation.createWorkSpace),
    authId,
    workspaceController.createWorkSpace
  )
  .get(
    // validate(workspaceValidation.getWorkSpaces),
    authId,
    workspaceController.getWorkSpaces
  );

router
  .route('/:workSpaceId')
  .get(
    validate(workspaceValidation.getWorkSpace),
    workspaceController.getWorkSpaceById
  )
  .delete(
    validate(workspaceValidation.deleteWorkspace),
    authId,
    workspaceController.deleteWorkspace
  )
  .put(
    validate(workspaceValidation.updateWorkspace),
    authId,
    workspaceController.updateWorkspace
  );

module.exports = router;
