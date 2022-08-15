const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Message = new Schema({
  fromPhone: { type: String },
  from: { type: String, default: 'Người dùng Zalo' },
  toPhone: { type: String },
  to: { type: String },
  phone: { type: String },
  content: { type: String },
  sentAt: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', Message);