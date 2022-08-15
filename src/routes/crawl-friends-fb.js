const express = require('express');
const router = express.Router();
const cors = require('cors');
const crawlFriendFbController = require('../app/controllers/crawlFriendFbController');
router.use(cors());

// router.use('/crawl-friends-fb/results', crawlFriendFbController.result);

router.post('/crawl-friends-fb', crawlFriendFbController.crawl);
router.get('/crawl-friends-fb', crawlFriendFbController.details);
router.use('/', crawlFriendFbController.index);

module.exports = router;