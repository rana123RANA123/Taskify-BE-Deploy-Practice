const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const UsergroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Agency',
    },
    apiPermissions: {
      type: [String],
      // required: true,
    },
    tabPermissions: {
      type: mongoose.Schema.Types.Mixed,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugins that convert mongoose to json and enable pagination
UsergroupSchema.plugin(toJSON);
UsergroupSchema.plugin(paginate);

const Usergroup = mongoose.model('Usergroup', UsergroupSchema);

module.exports = Usergroup;
