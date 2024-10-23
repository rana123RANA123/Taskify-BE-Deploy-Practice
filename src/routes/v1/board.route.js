const express = require('express');
const { boardController } = require('../../controllers');

const router = express.Router();

router.route('/').get(boardController.getBoard);

module.exports = router;
