const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { bankService } = require('../services');
const pick = require('../utils/pick');
const Bank = require('../models/bank.model');

const createBank = catchAsync(async (req, res) => {
  const bank = await bankService.createBank(req.body);
  res.status(httpStatus.CREATED).send({ bank });
});

const getBankById = async (id) => Bank.findById(id);

const getBank = catchAsync(async (req, res) => {
  const Banks = await getBankById(req.params.bankId);
  const agencyIdString = Banks.agencyId.toString();
  if (agencyIdString !== req.body.agencyId) {
    return res
      .status(httpStatus.FORBIDDEN)
      .send({ error: 'You are not allowed to GET this Bank Data.' });
  }

  res.send(Banks);
});

const updateBank = catchAsync(async (req, res) => {
  const Banks = await getBankById(req.params.bankId);
  const agencyIdString = Banks.agencyId.toString();

  if (agencyIdString !== req.body.agencyId) {
    return res
      .status(httpStatus.FORBIDDEN)
      .send({ error: 'You are not allowed to update this Bank Data.' });
  }

  const updatedBank = await bankService.updateBankById(
    req.params.bankId,
    req.body
  );
  res.send(updatedBank);
});

const deleteBank = catchAsync(async (req, res) => {
  const Banks = await getBankById(req.params.bankId);
  const agencyIdString = Banks.agencyId.toString();

  if (agencyIdString !== req.body.agencyId) {
    return res
      .status(httpStatus.FORBIDDEN)
      .send({ error: 'You are not allowed to delete this Bank Data.' });
  }

  await bankService.deleteBankById(req.params.bankId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getBanks = catchAsync(async (req, res) => {
  const { agencyId } = req.body.agencyId;
  const filter = { agencyId };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bankService.queryBank(filter, options);
  res.send(result);
});

module.exports = {
  createBank,
  deleteBank,
  updateBank,
  getBanks,
  getBank,
};
