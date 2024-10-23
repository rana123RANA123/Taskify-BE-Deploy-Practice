const express = require('express');
const { cardController } = require('../../controllers');

const router = express.Router();

router.get('/', cardController.getCardGroups);

module.exports = router;
