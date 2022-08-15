const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Friend = new Schema({
  index: { type: Number, default: 0 },
  name: { type: String, default: 'Người dùng Facebook' },
  link: { type: String, default: 'http://facebook.com' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Friend', Friend);