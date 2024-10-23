const express = require('express');
const validate = require('../../middlewares/validate');
const cardController = require('../../controllers/cards.controller');
const cardValidation = require('../../validations/cards.validations');

const router = express.Router();

router
  .route('/')
  .post(cardController.createCard)
  .get(validate(cardValidation.getCards), cardController.getCards);

router
  .route('/:cardId')
  .get(validate(cardValidation.getCard), cardController.getCard)
  .put(validate(cardValidation.updateCard), cardController.updateCard)
  .delete(validate(cardValidation.deleteCard), cardController.deleteCard);

module.exports = router;
