const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { visibility } = require('../config/boardEnums');
const TrelloCards = require('./cards.modal');
const TrelloTickets = require('./tickets.modal');

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    background: {
      type: String,
    },
    visibility: {
      type: String,
      enum: visibility,
      default: 'public',
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkSpace',
      required: true,
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    users: [{ 
      user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['MEMBER', 'ADMIN'],
        required: true,
      },
    }],
  },
  {
    timestamps: true,
  }
);

boardSchema.pre('remove', async function (next) {
  try {
    await TrelloCards.deleteMany({ boardId: this._id});
    await TrelloTickets.deleteMany({ boardId: this._id});
    next();
  } catch (error) {
    next(error);
  }
});

boardSchema.plugin(toJSON);
boardSchema.plugin(paginate);

/**
 * @typedef Boards
 */
const Boards = mongoose.model('Boards', boardSchema);

module.exports = Boards;
