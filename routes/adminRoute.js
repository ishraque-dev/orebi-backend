const express = require('express');

const router = express.Router();
const { merchantStatus } = require('../controllers/user/merchant');

router.patch('/merchant-status', merchantStatus);
module.exports = router;
