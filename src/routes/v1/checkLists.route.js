const express = require('express');
const validate = require('../../middlewares/validate');
const checklistValidation = require('../../validations/checkLists.validation');
const checklistController = require('../../controllers/checkList.contoller');

const router = express.Router();

router
  .route('/')
  .post(
    validate(checklistValidation.createChecklist),
    checklistController.createChecklist
  );

router
  .route('/:checkListId')
  .put(
    validate(checklistValidation.updateChecklist),
    checklistController.updateChecklist
  )
  .delete(
    validate(checklistValidation.deleteChecklist),
    checklistController.deleteChecklist
  );

module.exports = router;
