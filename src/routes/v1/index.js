const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const adminRoute = require('./admin.route');
const agencyRoute = require('./agency.route');
const boardRoute = require('./board.route');
const cardRoute = require('./card.route');
const bankRoute = require('./bank.route');
const userGroupRoute = require('./userGroup.route');
const customerRoute = require('./customer.route');
const boardsRoute = require('./boards.route');
const listsRoute = require('./cards.route');
const ticketsRoute = require('./tickets.route');
const workSpaceRoute = require('./workspace.route');
const checkListRoute = require('./checkLists.route');
const todosRoute = require('./todos.route');
const attachmentRoute = require('./attachment.route');
const boardInvitationRoute = require('./boardInvitation.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/workSpace',
    route: workSpaceRoute,
  },
  {
    path: '/boards',
    route: boardsRoute,
  },
  {
    path: '/lists',
    route: listsRoute,
  },
  {
    path: '/tickets',
    route: ticketsRoute,
  },
  {
    path: '/checkLists',
    route: checkListRoute,
  },
  {
    path: '/todos',
    route: todosRoute,
  },
  {
    path: '/attachments',
    route: attachmentRoute,
  },
  {
    path: '/agency',
    route: agencyRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/usergroup',
    route: userGroupRoute,
  },
  {
    path: '/bank',
    route: bankRoute,
  },
  {
    path: '/customer',
    route: customerRoute,
  },
  {
    path: '/board',
    route: boardRoute,
  },
  {
    path: '/boardInvitation',
    route: boardInvitationRoute,
  },
  {
    path: '/card',
    route: cardRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
