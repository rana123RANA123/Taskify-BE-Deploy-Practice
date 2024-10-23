const { Card } = require('../models');

const queryCardGroup = async (filter, options) =>
  Card.paginate(filter, options);

module.exports = {
  queryCardGroup,
};
