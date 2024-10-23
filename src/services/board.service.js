const { Board } = require('../models');

const queryBoardGroup = async (filter, options) =>
  Board.paginate(filter, options);

module.exports = {
  queryBoardGroup,
};
