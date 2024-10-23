const httpStatus = require('http-status');
const cardService = require('../services/cards.service');
const catchAsync = require('../utils/catchAsync');

const createCard = catchAsync(async (req, res) => {
  const card = await cardService.createCard(req.body);
  res.status(httpStatus.CREATED).send({ card });
});

const getCard = catchAsync(async (req, res) => {
  const { cardId } = req.params;
  const card = await cardService.getCardById(cardId);
  if (!card) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Card not found',
    });
  }
  res.status(httpStatus.OK).send(card);
});

const updateCard = catchAsync(async (req, res) => {
  const { cardId } = req.params;
  const card = await cardService.updateCardById(cardId, req.body);
  if (!card) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Card not found',
    });
  }
  res.status(httpStatus.OK).send(card);
});

const getCards = catchAsync(async (req, res) => {
  const { sortBy, limit, page } = req.query;
  const options = { sortBy, limit, page };
  const result = await cardService.queryCards({}, options);
  res.status(httpStatus.OK).send(result);
});

const deleteCard = catchAsync(async (req, res) => {
  const { cardId } = req.params;
  const card = await cardService.getCardById(cardId);
  if (!card) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Card not found',
    });
  }
  await cardService.deleteCardById(cardId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCard,
  updateCard,
  getCards,
  getCard,
  deleteCard,
};
