const express = require('express');
const router = express.Router();
const cors = require('cors');
const crawlGroupsZaloController = require('../app/controllers/crawlGroupsZaloController');
router.use(cors());

// router.use('/crawl-friends-fb/results', crawlFriendFbController.result);

router.post('/crawl', crawlGroupsZaloController.crawl);
router.get('/groups', crawlGroupsZaloController.results);
router.get('/groups/:index', crawlGroupsZaloController.results);
router.use('/', crawlGroupsZaloController.index);

module.exports = router;