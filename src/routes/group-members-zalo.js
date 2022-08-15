const express = require('express');
const router = express.Router();
const cors = require('cors');
const crawlGroupMembersZaloController = require('../app/controllers/crawlGroupMembersZaloController');
router.use(cors());

// router.use('/crawl-friends-fb/results', crawlFriendFbController.result);

router.post('/crawl', crawlGroupMembersZaloController.crawl);
router.get('/result', crawlGroupMembersZaloController.results);
router.use('/', crawlGroupMembersZaloController.index);

module.exports = router;