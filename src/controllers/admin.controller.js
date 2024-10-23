const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { authService, userService, tokenService, emailService, adminSevice } = require('../services');

const createAgency = catchAsync(async (req, res) => {
  const agency = await adminSevice.createAgency(req.body);
  res.status(httpStatus.CREATED).send({ agency });
});
const updateAgency = catchAsync(async (req, res) => {
  const agency = await adminSevice.updateAgencyById(req.params.agencyId, req.body);
  res.send(agency);
});
const deleteAgency = catchAsync(async (req, res) => {
  await adminSevice.deleteAgencyById(req.params.agencyId);
  res.status(httpStatus.NO_CONTENT).send();
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await adminSevice.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAgencies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await adminSevice.queryAgencies(filter, options);
  res.send(result);
});



const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User ');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAgency,
  deleteAgency,
  updateAgency,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  createUser,
  getAgencies,
  getUser,
  updateUser,
  deleteUser,
};
