const express = require('express');
const router = express.Router();
const cors = require('cors');
const AutoChatZaloController = require('../app/controllers/AutoChatZaloController');
router.use(cors());

// router.use('/crawl-friends-fb/results', crawlFriendFbController.result);
router.get('/chatlogs', AutoChatZaloController.chatLog);
router.post('/', AutoChatZaloController.autoChat);
router.use('/', AutoChatZaloController.index);

module.exports = router;