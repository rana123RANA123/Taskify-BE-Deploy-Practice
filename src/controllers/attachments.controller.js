const httpStatus = require('http-status');
const attachmentService = require('../services/attachments.service');
const catchAsync = require('../utils/catchAsync');

const createAttachment = async (req, res) => {
  try {
    const attachment = await attachmentService.createAttachment(
      req.body,
      req.file
    );
    res.status(201).json(attachment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAttachmentById = async (req, res) => {
  try {
    const attachment = await attachmentService.getAttachmentById(req.params.id);
    if (!attachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.status(200).json(attachment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAttachments = catchAsync(async (req, res) => {
  const { sortBy, limit, page } = req.query;
  const options = { sortBy, limit, page };
  const result = await attachmentService.queryAttachments({}, options);
  res.status(httpStatus.OK).send(result);
});

const getAttachmentsByTicketId = catchAsync(async (req, res) => {
  const { sortBy, limit, page } = req.query;
  const options = { sortBy, limit, page };

  const result = await attachmentService.getAttachmentsByTicketId(
    req.params.ticketId,
    options
  );
  if (!result) {
    return res
      .status(404)
      .json({ message: 'No attachments found for this ticket' });
  }

  res.status(200).json(result);
});

const deleteAttachment = async (req, res) => {
  try {
    const result = await attachmentService.deleteAttachment(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.status(200).json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAttachment,
  getAttachmentById,
  deleteAttachment,
  getAttachments,
  getAttachmentsByTicketId,
};
