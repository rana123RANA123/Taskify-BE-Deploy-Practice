const express = require('express');
const router = express.Router();
const { boardController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { boardValidation } = require('../../validations');
const authId = require('../../middlewares/authId');

router
  .route('/')
  .post(
    validate(boardValidation.createBoard),
    authId,
    boardController.createBoard
  )
  .get(authId, boardController.getBoards);
  
router
  .route('/:boardId/manageUsers')
  .post(authId,boardController.addUsersInBoard)
  .put(boardController.updateUserinBoard)
  .delete(boardController.removeUserFromBoard);

router
  .route('/:boardId/:userId')
  .get(boardController.getBoard)

router
  .route('/:boardId')
  .get(boardController.getBoardById)
  .put(
    validate(boardValidation.updateBoard),
    authId,
    boardController.updateBoard
  )
  .delete(
    validate(boardValidation.deleteBoard),
    authId,
    boardController.deleteBoard
  );

module.exports = router;
