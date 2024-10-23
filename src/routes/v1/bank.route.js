const express = require('express');
const bankController = require('../../controllers/bank.controller');
const agencyMiddleware = require('../../middlewares/agency');
const validate = require('../../middlewares/validate');
const bankValidation = require('../../validations/bank.validation');

const router = express.Router();

router
  .route('/')
  .post(agencyMiddleware, validate(bankValidation.createBank), bankController.createBank)
  .get(agencyMiddleware, bankController.getBanks);

router
  .route('/:bankId')
  .get(agencyMiddleware, bankController.getBank)
  .patch(agencyMiddleware, validate(bankValidation.updateBank), bankController.updateBank)
  .delete(agencyMiddleware, validate(bankValidation.deleteBank), bankController.deleteBank);

module.exports = router;
