const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const BankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Agency',
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugins that convert mongoose to json and enable pagination
BankSchema.plugin(toJSON);
BankSchema.plugin(paginate);

const Bank = mongoose.model('Bank', BankSchema);

module.exports = Bank;
