const express = require('express');
const router = express.Router();
const cors = require('cors');
const FmcardController = require('../app/controllers/FmcardController');
router.use(cors());

// router.use('/crawl-friends-fb/results', crawlFriendFbController.result);
router.get('/crawl-stats', FmcardController.crawlStats);
router.get('/crawl-nations', FmcardController.crawlNations);
router.get('/crawl-leagues', FmcardController.crawlLeagues);


router.get('/', FmcardController.index);

module.exports = router;