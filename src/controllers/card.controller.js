const catchAsync = require('../utils/catchAsync');
const { cardService } = require('../services');
const pick = require('../utils/pick');

const getCardGroups = catchAsync(async (req, res) => {
  const { searchTerm } = req.query;
  const searchFilter = searchTerm
    ? { name: { $regex: new RegExp(searchTerm.split(' ').join('.*'), 'i') } }
    : {};
  const filter = { ...searchFilter };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cardService.queryCardGroup(filter, options);
  res.send(result);
});

module.exports = {
  getCardGroups,
};
