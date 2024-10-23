const express = require('express');
const authId = require('../../middlewares/authId');
const { boardInvitationController } = require('../../controllers');
const { boardInvitationValidation } = require('../../validations');
const validate = require('../../middlewares/validate');
const router = express.Router();

router
  .route('/')
  .post(
    validate(boardInvitationValidation.createInvitation),
    authId,
    boardInvitationController.createBoardInvitation
  )
  .get(
    validate(boardInvitationValidation.queryInvitations),
    boardInvitationController.getBoardInvitations
  );

router
  .route('/:invitationId')
  .delete(
    validate(boardInvitationValidation.deleteInvitation),
    boardInvitationController.deleteBoardInvitation
  );

module.exports = router;
