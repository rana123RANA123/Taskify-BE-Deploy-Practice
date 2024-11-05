
const express = require('express');
const attachmentController = require('../../controllers/attachments.controller');
const  attachmentValidation  = require('../../validations/attachment.validation');
const multer = require('multer');
const validate = require('../../middlewares/validate');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });


router
.route('/')
.post(
    upload.single('image'),
    validate(attachmentValidation.createAttachment),
    attachmentController.createAttachment
  )
.get(validate(attachmentValidation.getAttachment), attachmentController.getAttachments);

router
.route('/:ticketId')
.get(validate(attachmentValidation.getAttachmentsByTicketId), attachmentController.getAttachmentsByTicketId)

router
.route('/:id')
.delete(validate(attachmentValidation.deleteAttachment), attachmentController.deleteAttachment);

module.exports = router;
