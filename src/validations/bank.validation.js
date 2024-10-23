const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBank = {
  body: Joi.object().keys({
    bankName: Joi.string().required(),
    agencyId: Joi.string().required(),
    balance: Joi.number().required(),
  }),
};

const updateBank = {
  params: Joi.object().keys({
    bankId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      bankName: Joi.string().required(),
      agencyId: Joi.string().required(),
      balance: Joi.number().required(),
    })
    .min(1),
};

const deleteBank = {
  params: Joi.object().keys({
    bankId: Joi.string().custom(objectId),
  }),
};

const getBanks = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createBank,
  deleteBank,
  updateBank,
  getBanks,
};
