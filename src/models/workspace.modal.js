const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { options } = require('../config/workspaceEnums');
const Boards = require('./boards.modal');
const TrelloCards = require('./cards.modal');
const TrelloTickets = require('./tickets.modal');

const workSpaceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    options: {
      type: String,
      required: true,
      enum: options,
      default: 'Others',
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  {
    timestamps: true,
  }
);

workSpaceSchema.pre('remove', async function (next) {
  try {
    const boards = await Boards.find({ workspaceId: this._id });
    for (const board of boards) {
      await TrelloCards.deleteMany({ boardId: board._id });
      await TrelloTickets.deleteMany({ boardId: board._id });
    }
    await Boards.deleteMany({ workspaceId: this._id });

    next();
  } catch (error) {
    next(error);
  }
});

workSpaceSchema.plugin(toJSON);
workSpaceSchema.plugin(paginate);

const WorkSpace = mongoose.model('WorkSpace', workSpaceSchema);

module.exports = WorkSpace;
