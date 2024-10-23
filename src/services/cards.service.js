const httpStatus = require('http-status');
const TrelloCards = require('../models/cards.modal');
const ApiError = require('../utils/ApiError');

const createCard = async (cardBody) => {
  const card = await TrelloCards.create(cardBody);
  return card;
};

const getCardById = async (id) => {
  return TrelloCards.findById(id).populate('members');
};

const updateCardById = async (cardId, updateBody) => {
  const card = await TrelloCards.findById(cardId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
  }
  Object.assign(card, updateBody);
  await card.save();
  return card;
};

const queryCards = async (filter, options) => {
  const cards = await TrelloCards.paginate(filter, options);
  return cards;
};

const deleteCardById = async (cardId) => {
  const card = await TrelloCards.findById(cardId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
  }
  await card.remove();
  return card;
};

module.exports = {
  createCard,
  getCardById,
  updateCardById,
  queryCards,
  deleteCardById,
};
