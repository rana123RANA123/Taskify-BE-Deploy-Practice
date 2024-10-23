const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Bank = require('../models/bank.model');
const { Types } = require('mongoose');

const createBank = async (bank) => {
  return Bank.create(bank);
};

const getBankById = async (id) => Bank.findById(id);

const queryBank = async (filter, options) => Bank.paginate(filter, options);

const updateBankById = async (bankId, updateBody) => {
  const bank = await getBankById(bankId);

  if (!bank) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bank not found');
  }

  Object.assign(bank, updateBody);
  await bank.save();

  return bank;
};

const deleteBankById = async (bankId) => {
  const bank = await getBankById(bankId);
  if (!bank) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bank not found');
  }
  await bank.remove();
  return bank;
};

module.exports = {
  queryBank,
  createBank,
  updateBankById,
  deleteBankById,
};
