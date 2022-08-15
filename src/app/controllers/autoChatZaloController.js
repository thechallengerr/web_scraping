const Message = require("../models/Message");
const { mongooseToMultipleObjects } = require('../../util/mongoose.js');
const { autoChatZalo } = require('../../util/auto_chat_zalo.js');

class AutoChatZaloController {
    //[GET] /auto-chat-zalo
    index(req, res) {
        res.render("auto-chat-zalo/auto-chat-zalo");
    }

    // [POST] /auto-chat-zalo
    async autoChat(req, res, next) {
        console.log(req.body);
        let phoneNumbers = req.body.phoneNumber.split(',');
        let messages = req.body.message.split(',');
        if (phoneNumbers.length === 0 || messages.length === 0) {
            res.send("No phone was found. Please comeback and try again.");
        }
        await autoChatZalo(phoneNumbers, messages)
            .then(messages => {
                // message này là array à đúng
                console.log(messages);
                res.redirect('/auto-chat-zalo/chatlogs');
            }).catch(next)

    }

    chatLog(req, res, next) {
        Message.find({})
            .sort({ updatedAt: -1, })
            .then(messages => {
                res.render('auto-chat-zalo/chatlogs', {
                    messages: mongooseToMultipleObjects(messages)
                })
            })
    }
}


module.exports = new AutoChatZaloController();
