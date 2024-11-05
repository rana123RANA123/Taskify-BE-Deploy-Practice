const Attachment = require('../models/attachments.modal');

const createAttachment = async (data, file) => {
  // Initialize the attachment data with common fields
  const attachmentData = {
    type: data.type,
    ticketId: data.ticketId,
    optionalText: data.optionalText,
    imageName: data.imageName,
    url: data.url,
  };

  // Handle different types of attachments
  if (data.type === 'image' && file) {
    // If the type is 'image' and a file is provided, set the imageName to the file's name
    attachmentData.imageName = file.filename;
  } else if (data.type === 'link') {
    // If the type is 'link', set the link property
    attachmentData.link = data.link;
  }

  // Create a new attachment instance using the prepared data
  const attachment = new Attachment(attachmentData);

  // Save the attachment to the database and return the result
  return await attachment.save();
};

module.exports = createAttachment;


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
