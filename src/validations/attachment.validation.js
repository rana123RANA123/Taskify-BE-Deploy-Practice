const Joi = require('joi');

const createAttachment = {
  body: Joi.object().keys({
    type: Joi.string().valid('image', 'link').required(),
    imageName: Joi.string().when('type', {
      is: 'image',
      then: Joi.required(),
    }),
    link: Joi.string().uri().when('type', {
      is: 'link',
      then: Joi.required(),
    }),
    ticketId: Joi.string().required(),
    optionalText: Joi.string().optional(),
  }),
};

const getAttachment = {
  params: Joi.object().keys({
    id: Joi.string().optional(),
  }),
};

const getAttachmentsByTicketId = {
  params: Joi.object().keys({
    ticketId: Joi.string().required(),
  }),
};

const deleteAttachment = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createAttachment,
  getAttachment,
  deleteAttachment,
  getAttachmentsByTicketId,
};
