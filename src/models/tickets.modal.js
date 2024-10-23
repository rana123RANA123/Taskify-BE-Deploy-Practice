const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    comments: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'archived', 'deleted'],
      default: 'active',
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lists',
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Boards',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ticketSchema.plugin(toJSON);
ticketSchema.plugin(paginate);

const TrelloTickets = mongoose.model('TrelloTickets', ticketSchema);

module.exports = TrelloTickets;
