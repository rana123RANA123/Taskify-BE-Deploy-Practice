const Attachment = require('../models/attachments.modal');

const createAttachment = async (data, file) => {
  const attachmentData = {
    type: data.type,
    ticketId: data.ticketId,
    optionalText: data.optionalText,
  };

  if (data.type === 'image' && file) {
    attachmentData.imageName = file.filename;
  } else if (data.type === 'link') {
    attachmentData.link = data.link;
  }

  const attachment = new Attachment(attachmentData);
  return await attachment.save();
};

const getAttachments = async () => {
  const attachments = await Attachment.find();
  return attachments;
};

const getAttachmentById = async (id) => {
  return await Attachment.findById(id).populate('ticketId');
};
const getAttachmentsByTicketId = async (ticketId, options) => {
  const filter = { ticketId };
  const attachments = await Attachment.paginate(filter, options);
  return attachments;
};

const queryAttachments = async (filter, options) => {
  const attachments = await Attachment.paginate(filter, options);
  return attachments;
};

const deleteAttachment = async (id) => {
  const attachment = await Attachment.findByIdAndDelete(id);
  return attachment;
};

module.exports = {
  createAttachment,
  getAttachmentById,
  deleteAttachment,
  getAttachments,
  queryAttachments,
  getAttachmentsByTicketId,
};
