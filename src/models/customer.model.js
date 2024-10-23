const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const CustomerSchema = new mongoose.Schema(
  {
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Agency',
    },
    name: {
      type: String,
      required: true,
    },
    customerType: {
      type: String,
      required: true,
    },
    creditLimit: {
      type: Number,
      required: true,
    },
    passportNumber: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
    contactPerson: {
      name: {
        type: String,
      },
      designation: {
        type: String,
      },
      phone: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add plugins that convert mongoose to json and enable pagination
CustomerSchema.plugin(toJSON);
CustomerSchema.plugin(paginate);

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
