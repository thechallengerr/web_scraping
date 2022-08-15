const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Groupz = new Schema({
  groupName: { type: String },
  groupMembers: { type: Array },
  groupQuantity: { type: Number },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Groupz', Groupz);