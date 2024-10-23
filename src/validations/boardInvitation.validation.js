const Joi = require('joi');
const mongoose = require('mongoose');

const createInvitation = {
  body: Joi.object().keys({
    boardId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid board ID');
        }
        return value;
      }),
    userId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid user ID');
        }
        return value;
      })
  }),
};

const deleteInvitation = {
  params: Joi.object().keys({
    invitationId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid invitation ID');
        }
        return value;
      })
      .required(),
  }),
};

const queryInvitations = {
  query: Joi.object().keys({
    boardId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid board ID');
        }
        return value;
      })
      .optional(),
    userId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid user ID');
        }
        return value;
      })
      .optional(),
    status: Joi.string()
      .valid('pending', 'accepted', 'declined', 'expired')
      .optional(),
  }),
};

module.exports = {
  createInvitation,
  deleteInvitation,
  queryInvitations,
};
