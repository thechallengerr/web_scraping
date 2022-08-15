const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Message = require('./Message.js');
const Friend = require('./Friend.js');
const Groupz = require('./Groupz.js');

const User = new Schema({
  userPhone: { type: String },
  userName: { type: String, default: 'Người dùng Zalo' },
  userEmail: { type: String },
  userPassword: { type: String },
  messages: { type: Message },
  friends: { type: Friend },
  groupz: { type: Groupz },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', User);