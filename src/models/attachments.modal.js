const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const attachmentSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'link'], required: true },
  imageName: {
    type: String,
    required: function () {
      return this.type === 'image';
    },
  },
  link: {
    type: String,
    required: function () {
      return this.type === 'link';
    },
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrelloTickets',
    required: true,
  },
  optionalText: { type: String },
  createdAt: { type: Date, default: Date.now },
});

attachmentSchema.plugin(toJSON);
attachmentSchema.plugin(paginate);

const Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = Attachment;
