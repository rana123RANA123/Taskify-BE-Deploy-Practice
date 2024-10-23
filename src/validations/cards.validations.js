const Joi = require('joi');
const mongoose = require('mongoose');

const createCard = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    status: Joi.string()
      .valid('active', 'inactive', 'archived', 'deleted')
      .optional(),
    boardId: Joi.string().required(),


    // members: Joi.array().items(Joi.string()).required(),
  }),
};

const getCards = {
  query: Joi.object().keys({
    title: Joi.string().optional(),
    status: Joi.string()
      .valid('active', 'inactive', 'archived', 'deleted')
      .optional(),
    // boardId: Joi.string().required(),

  }),
};

const getCard = {
  params: Joi.object().keys({
    cardId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid card ID');
        }
        return value;
      })
      .required(),
  }),
};

const updateCard = {
  params: Joi.object().keys({
    cardId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid card ID');
        }
        return value;
      })
      .required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().optional(),
      status: Joi.string()
        .valid('active', 'inactive', 'archived', 'deleted')
        .optional(),
      members: Joi.array().items(Joi.string()).optional(),
    })
    .min(1),
};

const deleteCard = {
  params: Joi.object().keys({
    cardId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid card ID');
        }
        return value;
      })
      .required(),
  }),
};

module.exports = {
  createCard,
  getCards,
  getCard,
  updateCard,
  deleteCard,
};
