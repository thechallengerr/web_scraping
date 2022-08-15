const express = require('express');
const router = express.Router();
const cors = require('cors');
const busboy = require('connect-busboy');
const CheckZaloNameController = require('../app/controllers/checkZaloNameController');
router.use(cors());
router.use(busboy());

// router.use('/crawl-friends-fb/results', crawlFriendFbController.result);
router.get('/result', CheckZaloNameController.result);
router.post('/check', CheckZaloNameController.check);
router.use('/', CheckZaloNameController.index);

module.exports = router;